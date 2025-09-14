import{n as C}from"./glsl-BH37Aalp.js";import{ds as N,hf as Fe,eN as Ue,aN as Ge,dV as Ee,n6 as je,n7 as He,n8 as Le,mk as _e,cf as Be,n9 as ke,na as qe,nb as Xe,nc as Ze,nd as Ye,ne as Qe,nf as Je,ng as Ke,iF as We,ew as ie,ec as j,e0 as V,eb as ee,ef as F,ee as D,dZ as B,eu as et,ea as Ae,d_ as tt,dX as Te}from"./index-CdyqwYB1.js";import{t as nt}from"./doublePrecisionUtils-B0owpBza.js";import{s as ot,a as st,c as rt,o as Ie,e as at,g as Oe,h as lt,p as it,w as ct,i as ut,j as ft,k as ht,n as G,f as E,l as Re,m as Pe}from"./Geometry-CHwAPwb_.js";import{e as x}from"./VertexAttribute-Cq4MnHjR.js";import{e as dt}from"./mat4f64-Dk4dwAN8.js";import{u as pt}from"./meshVertexSpaceUtils-CVwVUWgR.js";import{e as xe}from"./projectVectorToVector-CVuZv1VI.js";import{o as mt,x as wt}from"./hydratedFeatures-DMlh5ZSY.js";import{r as I,t as Me,n as U}from"./vec3f32-nZdmKIgz.js";import{o as gt,w as Ne}from"./Indices-BgUwEYPx.js";import{M as Ot,l as vt,x as xt}from"./plane-BsHZw3wS.js";import{k as yt}from"./sphere-Ca7bupzT.js";import{t as S}from"./orientedBoundingBox-CwLDXj5p.js";import{s as te}from"./InterleavedLayout-cZHdgmzQ.js";function tn(e){e.code.add(C`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),e.code.add(C`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaTofloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`),e.code.add(C`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`)}function nn(e,n){return e==null&&(e=[]),e.push(n),e}function on(e,n){if(e==null)return null;const o=e.filter(t=>t!==n);return o.length===0?null:o}function sn(e,n,o,t,s){oe[0]=e.get(n,0),oe[1]=e.get(n,1),oe[2]=e.get(n,2),nt(oe,k,3),o.set(s,0,k[0]),t.set(s,0,k[1]),o.set(s,1,k[2]),t.set(s,1,k[3]),o.set(s,2,k[4]),t.set(s,2,k[5])}const oe=N(),k=new Float32Array(6),At=.5;function rn(e,n){e.include(ot),e.attributes.add(x.POSITION,"vec3"),e.attributes.add(x.NORMAL,"vec3"),e.attributes.add(x.CENTEROFFSETANDDISTANCE,"vec4");const o=e.vertex;st(o,n),rt(o,n),o.uniforms.add(new Ie("viewport",t=>t.camera.fullViewport),new at("polygonOffset",t=>t.shaderPolygonOffset),new Oe("cameraGroundRelative",t=>t.camera.aboveGround?1:-1)),n.hasVerticalOffset&&lt(o),o.constants.add("smallOffsetAngle","float",.984807753012208),o.code.add(C`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),o.code.add(C`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${n.terrainDepthTest?C.float(0):C`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),n.draped&&!n.hasVerticalOffset||it(o),n.draped||(o.uniforms.add(new Oe("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),o.code.add(C`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${C.float(At)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),n.screenCenterOffsetUnitsEnabled&&ct(o),n.hasScreenSizePerspective&&ut(o),o.code.add(C`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${n.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${n.hasScreenSizePerspective&&(n.hasVerticalOffset||n.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${n.hasVerticalOffset?n.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${n.hasVerticalOffset?C`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${n.screenCenterOffsetUnitsEnabled?"":C`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${n.screenCenterOffsetUnitsEnabled?n.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${n.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Pt(e){e.uniforms.add(new ft("alignPixelEnabled",n=>n.alignPixelEnabled)),e.code.add(C`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(C`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}var ce;(function(e){e[e.Occluded=0]="Occluded",e[e.NotOccluded=1]="NotOccluded",e[e.Both=2]="Both",e[e.COUNT=3]="COUNT"})(ce||(ce={}));function an(e){e.vertex.uniforms.add(new Oe("renderTransparentlyOccludedHUD",n=>n.hudRenderStyle===ce.Occluded?1:n.hudRenderStyle===ce.NotOccluded?0:.75),new Ie("viewport",n=>n.camera.fullViewport),new ht("hudVisibilityTexture",n=>{var o;return(o=n.hudVisibility)==null?void 0:o.getTexture()})),e.vertex.include(Pt),e.vertex.code.add(C`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}function ln(e,n){if(e.type==="point")return _(e,n,!1);if(mt(e))switch(e.type){case"extent":return _(e.center,n,!1);case"polygon":return _(e.centroid,n,!1);case"polyline":return _($e(e),n,!0);case"mesh":return _(pt(e.vertexSpace,e.spatialReference)??e.extent.center,n,!1);case"multipoint":return}else switch(e.type){case"extent":return _(Mt(e),n,!0);case"polygon":return _($t(e),n,!0);case"polyline":return _($e(e),n,!0);case"multipoint":return}}function $e(e){const n=e.paths[0];if(!n||n.length===0)return null;const o=He(n,Le(n)/2);return xe(o[0],o[1],o[2],e.spatialReference)}function Mt(e){return xe(.5*(e.xmax+e.xmin),.5*(e.ymax+e.ymin),e.zmin!=null&&e.zmax!=null&&isFinite(e.zmin)&&isFinite(e.zmax)?.5*(e.zmax+e.zmin):void 0,e.spatialReference)}function $t(e){const n=e.rings[0];if(!n||n.length===0)return null;const o=_e(e.rings,!!e.hasZ);return xe(o[0],o[1],o[2],e.spatialReference)}function _(e,n,o){const t=o?e:wt(e);return n&&e?je(e,t,n)?t:null:t}function cn(e,n,o,t=0){if(e){n||(n=Ge());const s=e;let f=.5*s.width*(o-1),r=.5*s.height*(o-1);return s.width<1e-7*s.height?f+=r/20:s.height<1e-7*s.width&&(r+=f/20),Ee(n,s.xmin-f-t,s.ymin-r-t,s.xmax+f+t,s.ymax+r+t),n}return null}function un(e,n,o=null){const t=Ze(Ye);return e!=null&&(t[0]=e[0],t[1]=e[1],t[2]=e[2]),n!=null?t[3]=n:e!=null&&e.length>3&&(t[3]=e[3]),o&&(t[0]*=o,t[1]*=o,t[2]*=o,t[3]*=o),t}function fn(e=Fe,n,o,t=1){const s=new Array(3);if(n==null||o==null)s[0]=1,s[1]=1,s[2]=1;else{let f,r=0;for(let l=2;l>=0;l--){const c=e[l],a=c!=null,i=l===0&&!f&&!a,d=o[l];let y;c==="symbol-value"||i?y=d!==0?n[l]/d:1:a&&c!=="proportional"&&isFinite(c)&&(y=d!==0?c/d:1),y!=null&&(s[l]=y,f=y,r=Math.max(r,Math.abs(y)))}for(let l=2;l>=0;l--)s[l]==null?s[l]=f:s[l]===0&&(s[l]=.001*r)}for(let f=2;f>=0;f--)s[f]/=t;return Ue(s)}function St(e){return e.isPrimitive!=null}function hn(e){return bt(St(e)?[e.width,e.depth,e.height]:e)?null:"Symbol sizes may not be negative values"}function bt(e){const n=o=>o==null||o>=0;return Array.isArray(e)?e.every(n):n(e)}function dn(e,n,o,t=dt()){return e&&Qe(t,t,-e/180*Math.PI),n&&Je(t,t,n/180*Math.PI),o&&Ke(t,t,o/180*Math.PI),t}function pn(e,n,o){if(o.minDemResolution!=null)return o.minDemResolution;const t=Be(n),s=ke(e)*t,f=qe(e)*t,r=Xe(e)*(n.isGeographic?1:t);return s===0&&f===0&&r===0?o.minDemResolutionForPoints:.01*Math.max(s,f,r)}var ve;(function(e){function n(r,l){const c=r[l],a=r[l+1],i=r[l+2];return Math.sqrt(c*c+a*a+i*i)}function o(r,l){const c=r[l],a=r[l+1],i=r[l+2],d=1/Math.sqrt(c*c+a*a+i*i);r[l]*=d,r[l+1]*=d,r[l+2]*=d}function t(r,l,c){r[l]*=c,r[l+1]*=c,r[l+2]*=c}function s(r,l,c,a,i,d=l){(i=i||r)[d]=r[l]+c[a],i[d+1]=r[l+1]+c[a+1],i[d+2]=r[l+2]+c[a+2]}function f(r,l,c,a,i,d=l){(i=i||r)[d]=r[l]-c[a],i[d+1]=r[l+1]-c[a+1],i[d+2]=r[l+2]-c[a+2]}e.length=n,e.normalize=o,e.scale=t,e.add=s,e.subtract=f})(ve||(ve={}));const X=ve,pe=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],Tt=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],It=[0,0,1,0,1,1,0,1],Rt=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Ce=new Array(36);for(let e=0;e<6;e++)for(let n=0;n<6;n++)Ce[6*e+n]=e;const q=new Array(36);for(let e=0;e<6;e++)q[6*e]=0,q[6*e+1]=1,q[6*e+2]=2,q[6*e+3]=2,q[6*e+4]=3,q[6*e+5]=0;function mn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(24);for(let t=0;t<8;t++)o[3*t]=pe[t][0]*n[0],o[3*t+1]=pe[t][1]*n[1],o[3*t+2]=pe[t][2]*n[2];return new E(e,[[x.POSITION,new S(o,Rt,3,!0)],[x.NORMAL,new S(Tt,Ce,3)],[x.UV0,new S(It,q,2)]])}const me=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],Nt=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],Ct=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],Vt=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function wn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(18);for(let t=0;t<6;t++)o[3*t]=me[t][0]*n[0],o[3*t+1]=me[t][1]*n[1],o[3*t+2]=me[t][2]*n[2];return new E(e,[[x.POSITION,new S(o,Ct,3,!0)],[x.NORMAL,new S(Nt,Vt,3)]])}const se=I(-.5,0,-.5),re=I(.5,0,-.5),ae=I(0,0,.5),le=I(0,.5,0),Z=U(),Y=U(),J=U(),K=U(),W=U();j(Z,se,le),j(Y,se,re),B(J,Z,Y),V(J,J),j(Z,re,le),j(Y,re,ae),B(K,Z,Y),V(K,K),j(Z,ae,le),j(Y,ae,se),B(W,Z,Y),V(W,W);const we=[se,re,ae,le],zt=[0,-1,0,J[0],J[1],J[2],K[0],K[1],K[2],W[0],W[1],W[2]],Dt=[0,1,2,3,1,0,3,2,1,3,0,2],Ft=[0,0,0,1,1,1,2,2,2,3,3,3];function gn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(12);for(let t=0;t<4;t++)o[3*t]=we[t][0]*n[0],o[3*t+1]=we[t][1]*n[1],o[3*t+2]=we[t][2]*n[2];return new E(e,[[x.POSITION,new S(o,Dt,3,!0)],[x.NORMAL,new S(zt,Ft,3)]])}function On(e,n,o,t,s={uv:!0}){const f=-Math.PI,r=2*Math.PI,l=-Math.PI/2,c=Math.PI,a=Math.max(3,Math.floor(o)),i=Math.max(2,Math.floor(t)),d=(a+1)*(i+1),y=G(3*d),P=G(3*d),A=G(2*d),g=[];let h=0;for(let w=0;w<=i;w++){const T=[],u=w/i,M=l+u*c,$=Math.cos(M);for(let R=0;R<=a;R++){const H=R/a,O=f+H*r,z=Math.cos(O)*$,b=Math.sin(M),ne=-Math.sin(O)*$;y[3*h]=z*n,y[3*h+1]=b*n,y[3*h+2]=ne*n,P[3*h]=z,P[3*h+1]=b,P[3*h+2]=ne,A[2*h]=H,A[2*h+1]=u,T.push(h),++h}g.push(T)}const m=new Array;for(let w=0;w<i;w++)for(let T=0;T<a;T++){const u=g[w][T],M=g[w][T+1],$=g[w+1][T+1],R=g[w+1][T];w===0?(m.push(u),m.push($),m.push(R)):w===i-1?(m.push(u),m.push(M),m.push($)):(m.push(u),m.push(M),m.push($),m.push($),m.push(R),m.push(u))}const p=[[x.POSITION,new S(y,m,3,!0)],[x.NORMAL,new S(P,m,3,!0)]];return s.uv&&p.push([x.UV0,new S(A,m,2,!0)]),s.offset&&(p[0][0]=x.OFFSET,p.push([x.POSITION,new S(Float64Array.from(s.offset),Ne(m.length),3,!0)])),new E(e,p)}function vn(e,n,o,t){const s=Ut(n,o);return new E(e,s)}function Ut(e,n,o){let t,s;t=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],s=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];for(let c=0;c<t.length;c+=3)X.scale(t,c,e/X.length(t,c));let f={};function r(c,a){c>a&&([c,a]=[a,c]);const i=c.toString()+"."+a.toString();if(f[i])return f[i];let d=t.length;return t.length+=3,X.add(t,3*c,t,3*a,t,d),X.scale(t,d,e/X.length(t,d)),d/=3,f[i]=d,d}for(let c=0;c<n;c++){const a=s.length,i=new Array(4*a);for(let d=0;d<a;d+=3){const y=s[d],P=s[d+1],A=s[d+2],g=r(y,P),h=r(P,A),m=r(A,y),p=4*d;i[p]=y,i[p+1]=g,i[p+2]=m,i[p+3]=P,i[p+4]=h,i[p+5]=g,i[p+6]=A,i[p+7]=m,i[p+8]=h,i[p+9]=g,i[p+10]=h,i[p+11]=m}s=i,f={}}const l=Pe(t);for(let c=0;c<l.length;c+=3)X.normalize(l,c);return[[x.POSITION,new S(Pe(t),s,3,!0)],[x.NORMAL,new S(l,s,3,!0)]]}function xn(e,n={}){const{normal:o,position:t,color:s,rotation:f,size:r,centerOffsetAndDistance:l,uvs:c,featureAttribute:a,objectAndLayerIdColor:i=null}=n,d=t?Ae(t):N(),y=o?Ae(o):tt(0,0,1),P=s?[255*s[0],255*s[1],255*s[2],s.length>3?255*s[3]:255]:[255,255,255,255],A=r!=null&&r.length===2?r:[1,1],g=f!=null?[f]:[0],h=Ne(1),m=[[x.POSITION,new S(d,h,3,!0)],[x.NORMAL,new S(y,h,3,!0)],[x.COLOR,new S(P,h,4,!0)],[x.SIZE,new S(A,h,2)],[x.ROTATION,new S(g,h,1,!0)]];if(c&&m.push([x.UV0,new S(c,h,c.length)]),l!=null){const p=[l[0],l[1],l[2],l[3]];m.push([x.CENTEROFFSETANDDISTANCE,new S(p,h,4)])}if(a){const p=[a[0],a[1],a[2],a[3]];m.push([x.FEATUREATTRIBUTE,new S(p,h,4)])}return new E(e,m,null,Re.Point,i)}function Gt(e,n,o,t,s=!0,f=!0){let r=0;const l=n,c=e;let a=I(0,r,0),i=I(0,r+c,0),d=I(0,-1,0),y=I(0,1,0);t&&(r=c,i=I(0,0,0),a=I(0,r,0),d=I(0,1,0),y=I(0,-1,0));const P=[i,a],A=[d,y],g=o+2,h=Math.sqrt(c*c+l*l);if(t)for(let u=o-1;u>=0;u--){const M=u*(2*Math.PI/o),$=I(Math.cos(M)*l,r,Math.sin(M)*l);P.push($);const R=I(c*Math.cos(M)/h,-l/h,c*Math.sin(M)/h);A.push(R)}else for(let u=0;u<o;u++){const M=u*(2*Math.PI/o),$=I(Math.cos(M)*l,r,Math.sin(M)*l);P.push($);const R=I(c*Math.cos(M)/h,l/h,c*Math.sin(M)/h);A.push(R)}const m=new Array,p=new Array;if(s){for(let u=3;u<P.length;u++)m.push(1),m.push(u-1),m.push(u),p.push(0),p.push(0),p.push(0);m.push(P.length-1),m.push(2),m.push(1),p.push(0),p.push(0),p.push(0)}if(f){for(let u=3;u<P.length;u++)m.push(u),m.push(u-1),m.push(0),p.push(u),p.push(u-1),p.push(1);m.push(0),m.push(2),m.push(P.length-1),p.push(1),p.push(2),p.push(A.length-1)}const w=G(3*g);for(let u=0;u<g;u++)w[3*u]=P[u][0],w[3*u+1]=P[u][1],w[3*u+2]=P[u][2];const T=G(3*g);for(let u=0;u<g;u++)T[3*u]=A[u][0],T[3*u+1]=A[u][1],T[3*u+2]=A[u][2];return[[x.POSITION,new S(w,m,3,!0)],[x.NORMAL,new S(T,p,3,!0)]]}function yn(e,n,o,t,s,f=!0,r=!0){return new E(e,Gt(n,o,t,s,f,r))}function An(e,n,o,t,s,f,r){const l=s?Me(s):I(1,0,0),c=f?Me(f):I(0,0,0);r??(r=!0);const a=U();V(a,l);const i=U();F(i,a,Math.abs(n));const d=U();F(d,i,-.5),D(d,d,c);const y=I(0,1,0);Math.abs(1-Te(a,y))<.2&&ie(y,0,0,1);const P=U();B(P,a,y),V(P,P),B(y,P,a);const A=2*t+(r?2:0),g=t+(r?2:0),h=G(3*A),m=G(3*g),p=G(2*A),w=new Array(3*t*(r?4:2)),T=new Array(3*t*(r?4:2));r&&(h[3*(A-2)]=d[0],h[3*(A-2)+1]=d[1],h[3*(A-2)+2]=d[2],p[2*(A-2)]=0,p[2*(A-2)+1]=0,h[3*(A-1)]=h[3*(A-2)]+i[0],h[3*(A-1)+1]=h[3*(A-2)+1]+i[1],h[3*(A-1)+2]=h[3*(A-2)+2]+i[2],p[2*(A-1)]=1,p[2*(A-1)+1]=1,m[3*(g-2)]=-a[0],m[3*(g-2)+1]=-a[1],m[3*(g-2)+2]=-a[2],m[3*(g-1)]=a[0],m[3*(g-1)+1]=a[1],m[3*(g-1)+2]=a[2]);const u=(O,z,b)=>{w[O]=z,T[O]=b};let M=0;const $=U(),R=U();for(let O=0;O<t;O++){const z=O*(2*Math.PI/t);F($,y,Math.sin(z)),F(R,P,Math.cos(z)),D($,$,R),m[3*O]=$[0],m[3*O+1]=$[1],m[3*O+2]=$[2],F($,$,o),D($,$,d),h[3*O]=$[0],h[3*O+1]=$[1],h[3*O+2]=$[2],p[2*O]=O/t,p[2*O+1]=0,h[3*(O+t)]=h[3*O]+i[0],h[3*(O+t)+1]=h[3*O+1]+i[1],h[3*(O+t)+2]=h[3*O+2]+i[2],p[2*(O+t)]=O/t,p[2*O+1]=1;const b=(O+1)%t;u(M++,O,O),u(M++,O+t,O),u(M++,b,b),u(M++,b,b),u(M++,O+t,O),u(M++,b+t,b)}if(r){for(let O=0;O<t;O++){const z=(O+1)%t;u(M++,A-2,g-2),u(M++,O,g-2),u(M++,z,g-2)}for(let O=0;O<t;O++){const z=(O+1)%t;u(M++,O+t,g-1),u(M++,A-1,g-1),u(M++,z+t,g-1)}}const H=[[x.POSITION,new S(h,w,3,!0)],[x.NORMAL,new S(m,T,3,!0)],[x.UV0,new S(p,w,2,!0)]];return new E(e,H)}function Pn(e,n,o,t,s,f){t=t||10,s=s==null||s,te(n.length>1);const r=[[0,0,0]],l=[],c=[];for(let a=0;a<t;a++){l.push([0,-a-1,-(a+1)%t-1]);const i=a/t*2*Math.PI;c.push([Math.cos(i)*o,Math.sin(i)*o])}return Et(e,c,n,r,l,s,f)}function Et(e,n,o,t,s,f,r=I(0,0,0)){const l=n.length,c=G(o.length*l*3+(6*t.length||0)),a=G(o.length*l*3+(t?6:0)),i=new Array,d=new Array;let y=0,P=0;const A=N(),g=N(),h=N(),m=N(),p=N(),w=N(),T=N(),u=N(),M=N(),$=N(),R=N(),H=N(),O=N(),z=Ot();ie(M,0,1,0),j(g,o[1],o[0]),V(g,g),f?(D(u,o[0],r),V(h,u)):ie(h,0,0,1),Se(g,h,M,M,p,h,be),ee(m,h),ee(H,p);for(let v=0;v<t.length;v++)F(w,p,t[v][0]),F(u,h,t[v][2]),D(w,w,u),D(w,w,o[0]),c[y++]=w[0],c[y++]=w[1],c[y++]=w[2];a[P++]=-g[0],a[P++]=-g[1],a[P++]=-g[2];for(let v=0;v<s.length;v++)i.push(s[v][0]>0?s[v][0]:-s[v][0]-1+t.length),i.push(s[v][1]>0?s[v][1]:-s[v][1]-1+t.length),i.push(s[v][2]>0?s[v][2]:-s[v][2]-1+t.length),d.push(0),d.push(0),d.push(0);let b=t.length;const ne=t.length-1;for(let v=0;v<o.length;v++){let ye=!1;v>0&&(ee(A,g),v<o.length-1?(j(g,o[v+1],o[v]),V(g,g)):ye=!0,D($,A,g),V($,$),D(R,o[v-1],m),vt(o[v],$,z),xt(z,yt(R,A),u)?(j(u,u,o[v]),V(h,u),B(p,$,h),V(p,p)):Se($,m,H,M,p,h,be),ee(m,h),ee(H,p)),f&&(D(u,o[v],r),V(O,u));for(let L=0;L<l;L++)if(F(w,p,n[L][0]),F(u,h,n[L][1]),D(w,w,u),V(T,w),a[P++]=T[0],a[P++]=T[1],a[P++]=T[2],D(w,w,o[v]),c[y++]=w[0],c[y++]=w[1],c[y++]=w[2],!ye){const he=(L+1)%l;i.push(b+L),i.push(b+l+L),i.push(b+he),i.push(b+he),i.push(b+l+L),i.push(b+l+he);for(let de=0;de<6;de++){const De=i.length-6;d.push(i[De+de]-ne)}}b+=l}const Ve=o[o.length-1];for(let v=0;v<t.length;v++)F(w,p,t[v][0]),F(u,h,t[v][1]),D(w,w,u),D(w,w,Ve),c[y++]=w[0],c[y++]=w[1],c[y++]=w[2];const ue=P/3;a[P++]=g[0],a[P++]=g[1],a[P++]=g[2];const fe=b-l;for(let v=0;v<s.length;v++)i.push(s[v][0]>=0?b+s[v][0]:-s[v][0]-1+fe),i.push(s[v][2]>=0?b+s[v][2]:-s[v][2]-1+fe),i.push(s[v][1]>=0?b+s[v][1]:-s[v][1]-1+fe),d.push(ue),d.push(ue),d.push(ue);const ze=[[x.POSITION,new S(c,i,3,!0)],[x.NORMAL,new S(a,d,3,!0)]];return new E(e,ze)}function Mn(e,n,o,t){te(n.length>1,"createPolylineGeometry(): polyline needs at least 2 points"),te(n[0].length===3,"createPolylineGeometry(): malformed vertex"),te(o==null||o.length===n.length,"createPolylineGeometry: need same number of points and normals"),te(o==null||o[0].length===3,"createPolylineGeometry(): malformed normal");const s=We(3*n.length),f=new Array(2*(n.length-1));let r=0,l=0;for(let a=0;a<n.length;a++){for(let i=0;i<3;i++)s[r++]=n[a][i];a>0&&(f[l++]=a-1,f[l++]=a)}const c=[[x.POSITION,new S(s,f,3,!0)]];if(o){const a=G(3*o.length);let i=0;for(let d=0;d<n.length;d++)for(let y=0;y<3;y++)a[i++]=o[d][y];c.push([x.NORMAL,new S(a,f,3,!0)])}return t&&c.push([x.COLOR,new S(t,gt(t.length/4),4)]),new E(e,c,null,Re.Line)}function $n(e,n,o,t,s,f=0){const r=new Array(18),l=[[-o,f,s/2],[t,f,s/2],[0,n+f,s/2],[-o,f,-s/2],[t,f,-s/2],[0,n+f,-s/2]],c=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let a=0;a<6;a++)r[3*a]=l[a][0],r[3*a+1]=l[a][1],r[3*a+2]=l[a][2];return new E(e,[[x.POSITION,new S(r,c,3,!0)]])}function Sn(e,n){const o=e.getMutableAttribute(x.POSITION).data;for(let t=0;t<o.length;t+=3){const s=o[t],f=o[t+1],r=o[t+2];ie(Q,s,f,r),et(Q,Q,n),o[t]=Q[0],o[t+1]=Q[1],o[t+2]=Q[2]}}function bn(e,n=e){const o=e.attributes,t=o.get(x.POSITION).data,s=o.get(x.NORMAL).data;if(s){const f=n.getMutableAttribute(x.NORMAL).data;for(let r=0;r<s.length;r+=3){const l=s[r+1];f[r+1]=-s[r+2],f[r+2]=l}}if(t){const f=n.getMutableAttribute(x.POSITION).data;for(let r=0;r<t.length;r+=3){const l=t[r+1];f[r+1]=-t[r+2],f[r+2]=l}}}function ge(e,n,o,t,s){return!(Math.abs(Te(n,e))>s)&&(B(o,e,n),V(o,o),B(t,o,e),V(t,t),!0)}function Se(e,n,o,t,s,f,r){return ge(e,n,s,f,r)||ge(e,o,s,f,r)||ge(e,t,s,f,r)}const be=.99619469809,Q=N();function Tn(e){return e.type==="point"}export{un as A,wn as B,fn as D,pn as E,mn as F,Se as M,Sn as O,cn as S,hn as U,bt as Z,Tn as a,ce as b,Gt as c,At as d,nn as e,gn as f,An as g,yn as h,ln as i,sn as j,xn as k,Pt as l,bn as m,an as n,dn as o,On as p,$n as q,on as r,vn as s,tn as t,rn as u,Pn as v,Mn as w,Et as x};
