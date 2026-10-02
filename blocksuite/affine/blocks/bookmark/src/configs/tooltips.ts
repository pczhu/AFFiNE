import { editorText } from '@blocksuite/affine-shared/utils';
import { html } from 'lit';
// prettier-ignore
export const LinkTooltip = () => html`<svg width="170" height="68" viewBox="0 0 170 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="170" height="68" rx="2" fill="white"/>
<mask id="mask0_16460_1007" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="170" height="68">
<rect width="170" height="68" rx="2" fill="white"/>
</mask>
<g mask="url(#mask0_16460_1007)">
<text fill="#121212" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="10" letter-spacing="0px"><tspan x="8" y="15.6364">${editorText("In a decentralized system, we can have a kaleidoscopic")}</tspan><tspan x="8" y="27.6364">${editorText("complexity to our data.&#10;")}</tspan><tspan x="8" y="63.6364">${editorText("Any user may have a different perspective on what data they")}</tspan><tspan x="8" y="75.6364">${editorText("either have, choose to share, or accept.&#10;")}</tspan><tspan x="8" y="111.636">${editorText("For example, one user&#x2019;s edits to a document might be on")}</tspan><tspan x="8" y="123.636">${editorText("their laptop on an airplane; when the plane lands and the")}</tspan><tspan x="8" y="135.636">${editorText("computer reconnects, those changes are distributed to")}</tspan><tspan x="8" y="147.636">${editorText("other users.&#10;")}</tspan><tspan x="8" y="183.636">${editorText("Other users might choose to accept all, some, or none of")}</tspan><tspan x="8" y="195.636">${editorText("those changes to their version of the document.")}</tspan></text>
<text fill="#1E67AF" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="11" letter-spacing="0em"><tspan x="8" y="45.5">${editorText("Learn about AFFiNE")}</tspan></text>
</g>
</svg>
`;
