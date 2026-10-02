# syntax=docker/dockerfile:1.7

FROM node:22-bookworm AS source
WORKDIR /source
ENV HUSKY=0 \
    ELECTRON_SKIP_BINARY_DOWNLOAD=1 \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    SENTRYCLI_SKIP_DOWNLOAD=1 \
    YARN_ENABLE_SCRIPTS=true
RUN apt-get update && apt-get install -y --no-install-recommends \
    clang cmake pkg-config libssl-dev ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable
COPY . .
RUN --mount=type=cache,target=/root/.yarn/berry \
    yarn install --immutable --inline-builds

FROM source AS native
ENV PATH=/root/.cargo/bin:$PATH \
    CC="clang -D_BSD_SOURCE" \
    TARGET_CC="clang -D_BSD_SOURCE" \
    CARGO_BUILD_JOBS=6
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
    | sh -s -- -y --profile minimal --default-toolchain none \
    && rustup toolchain install "$(sed -n 's/^channel = "\(.*\)"/\1/p' rust-toolchain.toml)" --profile minimal
ARG AFFINE_PRO_PUBLIC_KEY
RUN --mount=type=cache,target=/root/.cargo/registry \
    --mount=type=cache,target=/root/.cargo/git \
    --mount=type=cache,target=/source/target \
    node -e "require('crypto').createPublicKey(process.env.AFFINE_PRO_PUBLIC_KEY)" \
    && yarn workspace @affine/server-native build --target x86_64-unknown-linux-gnu \
    && cp packages/backend/native/server-native.node packages/backend/native/server-native.x64.node

FROM native AS backend
ARG BUILD_TYPE=canary
ARG GIT_SHA=local-source
ENV BUILD_TYPE=$BUILD_TYPE GITHUB_SHA=$GIT_SHA NODE_OPTIONS=--max-old-space-size=12288
COPY .docker/local/build-checked.sh /usr/local/bin/affine-build-checked
# 本构建只支持 Linux x64，避免打包器查找未构建的 ARM 文件。
RUN node -e "require('fs').writeFileSync('packages/backend/native/index.js', 'module.exports = require(\"./server-native.x64.node\");\n')" \
    && sed -i 's/\r$//' /usr/local/bin/affine-build-checked \
    && chmod +x /usr/local/bin/affine-build-checked
RUN yarn workspace @affine/server prisma generate \
    && affine-build-checked packages/backend/server/dist/main.js yarn workspace @affine/server build \
    && test -s packages/backend/server/dist/server-native.x64.node

# 依次编译各网页，避免多个编译任务同时耗尽 Docker 内存。
FROM backend AS web
ENV PUBLIC_PATH=/
RUN affine-build-checked packages/frontend/apps/web/dist/index.html yarn affine @affine/web build
FROM web AS admin
ENV PUBLIC_PATH=/admin/
RUN affine-build-checked packages/frontend/admin/dist/index.html yarn affine @affine/admin build
FROM admin AS mobile
ENV PUBLIC_PATH=/mobile/
RUN affine-build-checked packages/frontend/apps/mobile/dist/index.html yarn affine @affine/mobile build

FROM mobile AS production
RUN --mount=type=cache,target=/root/.yarn/berry \
    yarn workspaces focus @affine/server --production \
    && yarn workspace @affine/server prisma generate

# 沿用官方镜像的文件布局和清理脚本。
FROM node:22-bookworm-slim AS assets
WORKDIR /app
COPY --from=production /source/packages/backend/server /app
COPY --from=production /source/node_modules /app/node_modules
COPY --from=web /source/packages/frontend/apps/web/dist /app/static
COPY --from=admin /source/packages/frontend/admin/dist /app/static/admin
COPY --from=mobile /source/packages/frontend/apps/mobile/dist /app/static/mobile
ARG TARGETARCH
ARG TARGETVARIANT
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && AFFINE_DOCKER_CLEAN=1 TARGETARCH="$TARGETARCH" TARGETVARIANT="$TARGETVARIANT" node ./scripts/docker-clean.mjs \
    && test -s ./dist/main.js \
    && node -e "require('./dist/server-native.x64.node')"

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ARG GIT_SHA=local-source
LABEL org.opencontainers.image.source="https://github.com/toeverything/AFFiNE" \
    org.opencontainers.image.revision=$GIT_SHA
COPY --from=assets /app /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates libjemalloc2 \
    && rm -rf /var/lib/apt/lists/*
ENV LD_PRELOAD=libjemalloc.so.2
EXPOSE 3010
CMD ["sh", "-c", "node ./scripts/upgrade-config.js && exec node ./dist/main.js"]
