# 本地源码构建与部署

本机功能验证时，在 Windows PowerShell 7 中从仓库根目录运行：

```powershell
pwsh -File .docker/local/deploy.ps1 -UseTestPublicKey
```

需要 Docker Desktop 正常运行并使用 Linux 容器。构建目标为 `linux/amd64`。首次构建会下载 Node、Rust 和软件依赖，然后依次编译服务端、网页、管理后台及手机网页。本流程不预置大模型权重。

当前源码在启动时要求嵌入 `AFFINE_PRO_PUBLIC_KEY`。这把公钥用于确认授权文件的签名。`-UseTestPublicKey` 从官方 [build-test.yml](../../.github/workflows/build-test.yml) 读取公开测试公钥，仅用于本机测试，不能验证正式付费授权。正式部署应向官方取得正式公钥，并指定 PEM 格式文件：

```powershell
pwsh -File .docker/local/deploy.ps1 -PublicKeyPath 'E:\路径\affine-pro-public-key.pem'
```

AFFiNE 应用镜像为本地生成的 `affine-local:source`。基础镜像使用 Node、Redis 和带向量扩展的 PostgreSQL。构建阶段和启动顺序参考官方 [build-images.yml](../../.github/workflows/build-images.yml)、[Dockerfile](../../.github/deployment/node/Dockerfile) 和 [compose.yml](../selfhost/compose.yml)。

只构建镜像：

```powershell
pwsh -File .docker/local/deploy.ps1 -BuildOnly -UseTestPublicKey
```

使用已构建的镜像启动：

```powershell
pwsh -File .docker/local/deploy.ps1 -SkipBuild
```

构建默认采用源码所在开发分支的构建类型。需要其他类型时传入 `-BuildType stable` 等参数；这个参数控制页面的构建配置，不会将开发分支代码转换为稳定版本。

## 访问与数据

默认访问 <http://localhost:3010>，管理后台为 <http://localhost:3010/admin>。端口绑定、服务地址和镜像定义见 [compose.yml](./compose.yml)。需要调整访问地址时，在本目录 `.env` 中设置 `AFFINE_PORT` 和 `AFFINE_SERVER_EXTERNAL_URL`。

脚本首次部署会生成数据库密码并保存到 `.env`，该文件不会提交到 Git。文件、配置和数据库保存于 Docker 数据卷，普通停止和重启会保留数据。数据库初始化完成后才会启动应用。

## 日志与停止

构建日志保存在本目录 `logs/build.log`。在仓库根目录执行：

```powershell
docker compose --env-file .docker/local/.env -f .docker/local/compose.yml logs --tail 100 affine affine_migration
docker compose --env-file .docker/local/.env -f .docker/local/compose.yml ps -a
docker compose --env-file .docker/local/.env -f .docker/local/compose.yml stop
```

源码更新后重新运行部署脚本即可重新构建。升级前备份 Docker 数据卷，尤其是数据库、文件存储和配置。
