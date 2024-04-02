"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[358],{9009:function(e,t,r){r.d(t,{Bt:function(){return sh},IO:function(){return i3},JU:function(){return iN},PL:function(){return sl},QT:function(){return sa},ad:function(){return iR},ar:function(){return i8},hJ:function(){return iD},pl:function(){return su}});var n,i,s=r(5723),a=r(6574),o=r(9858),l=r(8954),u=r(1197),h=r(9079);let c="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}d.UNAUTHENTICATED=new d(null),d.GOOGLE_CREDENTIALS=new d("google-credentials-uid"),d.FIRST_PARTY=new d("first-party-uid"),d.MOCK_USER=new d("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let f="10.8.1",m=new o.Yd("@firebase/firestore");function p(){return m.logLevel}function g(e,...t){if(m.logLevel<=o.in.DEBUG){let r=t.map(v);m.debug(`Firestore (${f}): ${e}`,...r)}}function y(e,...t){if(m.logLevel<=o.in.ERROR){let r=t.map(v);m.error(`Firestore (${f}): ${e}`,...r)}}function w(e,...t){if(m.logLevel<=o.in.WARN){let r=t.map(v);m.warn(`Firestore (${f}): ${e}`,...r)}}function v(e){if("string"==typeof e)return e;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(e="Unexpected state"){let t=`FIRESTORE (${f}) INTERNAL ASSERTION FAILED: `+e;throw y(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class T extends l.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class C{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(d.UNAUTHENTICATED))}shutdown(){}}class A{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class b{constructor(e){this.t=e,this.currentUser=d.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),i=new I;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new I,e.enqueueRetryable(()=>n(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{g("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(g("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new I)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(g("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||_(),new S(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||_(),new d(e)}}class D{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=d.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class N{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new D(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(d.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class k{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class x{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=e=>{null!=e.error&&g("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.R;return this.R=e.token,g("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{g("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.A.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.A.getImmediate({optional:!0});e?n(e):g("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||_(),this.R=e.token,new k(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let t=0;t<e;t++)r[t]=Math.floor(256*Math.random());return r}(40);for(let i=0;i<n.length;++i)r.length<20&&n[i]<t&&(r+=e.charAt(n[i]%e.length))}return r}}function L(e,t){return e<t?-1:e>t?1:0}function V(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new T(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new T(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return O.fromMillis(Date.now())}static fromDate(e){return O.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new O(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?L(this.nanoseconds,e.nanoseconds):L(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.timestamp=e}static fromTimestamp(e){return new M(e)}static min(){return new M(new O(0,0))}static max(){return new M(new O(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e,t,r){void 0===t?t=0:t>e.length&&_(),void 0===r?r=e.length-t:r>e.length-t&&_(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===F.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof F?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.get(n),i=t.get(n);if(r<i)return -1;if(r>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class P extends F{construct(e,t,r){return new P(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new T(E.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new P(t)}static emptyPath(){return new P([])}}let U=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class q extends F{construct(e,t,r){return new q(e,t,r)}static isValidIdentifier(e){return U.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),q.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new q(["__name__"])}static fromServerFormat(e){let t=[],r="",n=0,i=()=>{if(0===r.length)throw new T(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},s=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new T(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new T(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?s=!s:"."!==t||s?r+=t:i(),n++}if(i(),s)throw new T(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new q(t)}static emptyPath(){return new q([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(P.fromString(e))}static fromName(e){return new B(P.fromString(e).popFirst(5))}static empty(){return new B(P.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===P.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return P.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new P(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}$.UNKNOWN_ID=-1;class z{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new z(M.min(),B.empty(),-1)}static max(){return new z(M.max(),B.empty(),-1)}}class K{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q(e){if(e.code!==E.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;g("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&_(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new j((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof j?t:j.resolve(t)}catch(e){return j.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):j.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):j.reject(t)}static resolve(e){return new j((t,r)=>{t(e)})}static reject(e){return new j((t,r)=>{r(e)})}static waitFor(e){return new j((t,r)=>{let n=0,i=0,s=!1;e.forEach(e=>{++n,e.next(()=>{++i,s&&i===n&&t()},e=>r(e))}),s=!0,i===n&&t()})}static or(e){let t=j.resolve(!1);for(let r of e)t=t.next(e=>e?j.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new j((r,n)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&r(s)},e=>n(e))}})}static doWhile(e,t){return new j((r,n)=>{let i=()=>{!0===e()?t().next(()=>{i()},n):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new I,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Y(e,t.error)):this.V.resolve()},this.transaction.onerror=t=>{let r=et(t.target.error);this.V.reject(new Y(e,r))}}static open(e,t,r,n){try{return new G(t,e.transaction(n,r))}catch(e){throw new Y(t,e)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(g("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){return new J(this.transaction.objectStore(e))}}class W{constructor(e,t,r){this.name=e,this.version=t,this.p=r,12.2===W.S((0,l.z$)())&&y("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return g("SimpleDb","Removing database:",e),Z(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!(0,l.hl)())return!1;if(W.C())return!0;let e=(0,l.z$)(),t=W.S(e),r=W.v(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<r&&r<4.5)}static C(){var e;return void 0!==h&&"YES"===(null===(e=h.__PRIVATE_env)||void 0===e?void 0:e.F)}static M(e,t){return e.store(t)}static S(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i);return Number(t?t[1].split("_").slice(0,2).join("."):"-1")}static v(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}async O(e){return this.db||(g("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{let n=indexedDB.open(this.name,this.version);n.onsuccess=e=>{t(e.target.result)},n.onblocked=()=>{r(new Y(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},n.onerror=t=>{let n=t.target.error;"VersionError"===n.name?r(new T(E.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===n.name?r(new T(E.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+n)):r(new Y(e,n))},n.onupgradeneeded=e=>{g("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.p.N(t,n.transaction,e.oldVersion,this.version).next(()=>{g("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.B&&(this.db.onversionchange=e=>this.B(e)),this.db}L(e){this.B=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,n){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.O(e);let t=G.open(this.db,e,i?"readonly":"readwrite",r),s=n(t).next(e=>(t.g(),e)).catch(e=>(t.abort(e),j.reject(e))).toPromise();return s.catch(()=>{}),await t.m,s}catch(t){let e="FirebaseError"!==t.name&&s<3;if(g("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class H{constructor(e){this.k=e,this.q=!1,this.K=null}get isDone(){return this.q}get $(){return this.K}set cursor(e){this.k=e}done(){this.q=!0}U(e){this.K=e}delete(){return Z(this.k.delete())}}class Y extends T{constructor(e,t){super(E.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function X(e){return"IndexedDbTransactionError"===e.name}class J{constructor(e){this.store=e}put(e,t){let r;return void 0!==t?(g("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(g("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Z(r)}add(e){return g("SimpleDb","ADD",this.store.name,e,e),Z(this.store.add(e))}get(e){return Z(this.store.get(e)).next(t=>(void 0===t&&(t=null),g("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return g("SimpleDb","DELETE",this.store.name,e),Z(this.store.delete(e))}count(){return g("SimpleDb","COUNT",this.store.name),Z(this.store.count())}W(e,t){let r=this.options(e,t),n=r.index?this.store.index(r.index):this.store;if("function"==typeof n.getAll){let e=n.getAll(r.range);return new j((t,r)=>{e.onerror=e=>{r(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{let e=this.cursor(r),t=[];return this.G(e,(e,r)=>{t.push(r)}).next(()=>t)}}j(e,t){let r=this.store.getAll(e,null===t?void 0:t);return new j((e,t)=>{r.onerror=e=>{t(e.target.error)},r.onsuccess=t=>{e(t.target.result)}})}H(e,t){g("SimpleDb","DELETE ALL",this.store.name);let r=this.options(e,t);r.J=!1;let n=this.cursor(r);return this.G(n,(e,t,r)=>r.delete())}Y(e,t){let r;t?r=e:(r={},t=e);let n=this.cursor(r);return this.G(n,t)}Z(e){let t=this.cursor({});return new j((r,n)=>{t.onerror=e=>{n(et(e.target.error))},t.onsuccess=t=>{let n=t.target.result;n?e(n.primaryKey,n.value).next(e=>{e?n.continue():r()}):r()}})}G(e,t){let r=[];return new j((n,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void n();let s=new H(i),a=t(i.primaryKey,i.value,s);if(a instanceof j){let e=a.catch(e=>(s.done(),j.reject(e)));r.push(e)}s.isDone?n():null===s.$?i.continue():i.continue(s.$)}}).next(()=>j.waitFor(r))}options(e,t){let r;return void 0!==e&&("string"==typeof e?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let r=this.store.index(e.index);return e.J?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Z(e){return new j((t,r)=>{e.onsuccess=e=>{t(e.target.result)},e.onerror=e=>{r(et(e.target.error))}})}let ee=!1;function et(e){let t=W.S((0,l.z$)());if(t>=12.2&&t<13){let t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){let e=new T("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return ee||(ee=!0,setTimeout(()=>{throw e},0)),e}}return e}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.se(e),this.oe=e=>t.writeSequenceNumber(e))}se(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.oe&&this.oe(e),e}}function en(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function es(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function ea(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}er._e=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e,t){this.comparator=e,this.root=t||eu.EMPTY}insert(e,t){return new eo(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,eu.BLACK,null,null))}remove(e){return new eo(this.comparator,this.root.remove(e,this.comparator).copy(null,null,eu.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new el(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new el(this.root,e,this.comparator,!1)}getReverseIterator(){return new el(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new el(this.root,e,this.comparator,!0)}}class el{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class eu{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:eu.RED,this.left=null!=n?n:eu.EMPTY,this.right=null!=i?i:eu.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new eu(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,i=r(e,n.key);return(n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return eu.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return eu.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,eu.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,eu.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw _();let e=this.left.check();if(e!==this.right.check())throw _();return e+(this.isRed()?0:1)}}eu.EMPTY=null,eu.RED=!0,eu.BLACK=!1,eu.EMPTY=new class{constructor(){this.size=0}get key(){throw _()}get value(){throw _()}get color(){throw _()}get left(){throw _()}get right(){throw _()}copy(e,t,r,n,i){return this}insert(e,t,r){return new eu(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e){this.comparator=e,this.data=new eo(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ec(this.data.getIterator())}getIteratorFrom(e){return new ec(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof eh)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new eh(this.comparator);return t.data=e,t}}class ec{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e){this.fields=e,e.sort(q.comparator)}static empty(){return new ed([])}unionWith(e){let t=new eh(q.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new ed(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return V(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.binaryString=e}static fromBase64String(e){return new em(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new ef("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new em(function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return L(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}em.EMPTY_BYTE_STRING=new em("");let ep=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function eg(e){if(e||_(),"string"==typeof e){let t=0,r=ep.exec(e);if(r||_(),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:ey(e.seconds),nanos:ey(e.nanos)}}function ey(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function ew(e){return"string"==typeof e?em.fromBase64String(e):em.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ev(e){var t,r;return"server_timestamp"===(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===r?void 0:r.stringValue)}function e_(e){let t=e.mapValue.fields.__previous_value__;return ev(t)?e_(t):t}function eE(e){let t=eg(e.mapValue.fields.__local_write_time__.timestampValue);return new O(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(e,t,r,n,i,s,a,o,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l}}class eI{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new eI("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof eI&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eS={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function eC(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?ev(e)?4:eP(e)?9007199254740991:10:_()}function eA(e,t){if(e===t)return!0;let r=eC(e);if(r!==eC(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eE(e).isEqual(eE(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=eg(e.timestampValue),n=eg(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return ew(e.bytesValue).isEqual(ew(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return ey(e.geoPointValue.latitude)===ey(t.geoPointValue.latitude)&&ey(e.geoPointValue.longitude)===ey(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return ey(e.integerValue)===ey(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=ey(e.doubleValue),n=ey(t.doubleValue);return r===n?en(r)===en(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return V(e.arrayValue.values||[],t.arrayValue.values||[],eA);case 10:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(ei(r)!==ei(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!eA(r[e],n[e])))return!1;return!0}(e,t);default:return _()}}function eb(e,t){return void 0!==(e.values||[]).find(e=>eA(e,t))}function eD(e,t){if(e===t)return 0;let r=eC(e),n=eC(t);if(r!==n)return L(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return L(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=ey(e.integerValue||e.doubleValue),n=ey(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return eN(e.timestampValue,t.timestampValue);case 4:return eN(eE(e),eE(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){let r=ew(e),n=ew(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=L(r[e],n[e]);if(0!==t)return t}return L(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=L(ey(e.latitude),ey(t.latitude));return 0!==r?r:L(ey(e.longitude),ey(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=eD(r[e],n[e]);if(t)return t}return L(r.length,n.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===eS.mapValue&&t===eS.mapValue)return 0;if(e===eS.mapValue)return 1;if(t===eS.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),i=t.fields||{},s=Object.keys(i);n.sort(),s.sort();for(let e=0;e<n.length&&e<s.length;++e){let t=L(n[e],s[e]);if(0!==t)return t;let a=eD(r[n[e]],i[s[e]]);if(0!==a)return a}return L(n.length,s.length)}(e.mapValue,t.mapValue);default:throw _()}}function eN(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return L(e,t);let r=eg(e),n=eg(t),i=L(r.seconds,n.seconds);return 0!==i?i:L(r.nanos,n.nanos)}function ek(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=eg(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?ew(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,B.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=ek(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let i of t)n?n=!1:r+=",",r+=`${i}:${ek(e.fields[i])}`;return r+"}"}(e.mapValue):_()}function ex(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function eR(e){return!!e&&"integerValue"in e}function eL(e){return!!e&&"arrayValue"in e}function eV(e){return!!e&&"nullValue"in e}function eO(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function eM(e){return!!e&&"mapValue"in e}function eF(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return es(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=eF(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=eF(e.arrayValue.values[r]);return t}return Object.assign({},e)}function eP(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eU{constructor(e){this.value=e}static empty(){return new eU({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!eM(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=eF(t)}setAll(e){let t=q.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=eF(e):n.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){let t=this.field(e.popLast());eM(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return eA(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];eM(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(es(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new eU(eF(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eq{constructor(e,t,r,n,i,s,a){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new eq(e,0,M.min(),M.min(),M.min(),eU.empty(),0)}static newFoundDocument(e,t,r,n){return new eq(e,1,t,M.min(),r,n,0)}static newNoDocument(e,t){return new eq(e,2,t,M.min(),M.min(),eU.empty(),0)}static newUnknownDocument(e,t){return new eq(e,3,t,M.min(),M.min(),eU.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(M.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=eU.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=eU.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=M.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof eq&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new eq(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eB{constructor(e,t){this.position=e,this.inclusive=t}}function e$(e,t,r){let n=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(n=s.field.isKeyField()?B.comparator(B.fromName(a.referenceValue),r.key):eD(a,r.data.field(s.field)),"desc"===s.dir&&(n*=-1),0!==n)break}return n}function ez(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!eA(e.position[r],t.position[r]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eK{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ{}class ej extends eQ{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new eY(e,t,r):"array-contains"===t?new e0(e,r):"in"===t?new e1(e,r):"not-in"===t?new e2(e,r):"array-contains-any"===t?new e4(e,r):new ej(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new eX(e,r):new eJ(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(eD(t,this.value)):null!==t&&eC(this.value)===eC(t)&&this.matchesComparison(eD(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return _()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class eG extends eQ{constructor(e,t){super(),this.filters=e,this.op=t,this.ue=null}static create(e,t){return new eG(e,t)}matches(e){return eW(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ue||(this.ue=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ue}getFilters(){return Object.assign([],this.filters)}}function eW(e){return"and"===e.op}function eH(e){for(let t of e.filters)if(t instanceof eG)return!1;return!0}class eY extends ej{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){let t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class eX extends ej{constructor(e,t){super(e,"in",t),this.keys=eZ("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class eJ extends ej{constructor(e,t){super(e,"not-in",t),this.keys=eZ("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function eZ(e,t){var r;return((null===(r=t.arrayValue)||void 0===r?void 0:r.values)||[]).map(e=>B.fromName(e.referenceValue))}class e0 extends ej{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return eL(t)&&eb(t.arrayValue,this.value)}}class e1 extends ej{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eb(this.value.arrayValue,t)}}class e2 extends ej{constructor(e,t){super(e,"not-in",t)}matches(e){if(eb(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!eb(this.value.arrayValue,t)}}class e4 extends ej{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!eL(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eb(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3{constructor(e,t=null,r=[],n=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=s,this.endAt=a,this.ce=null}}function e9(e,t=null,r=[],n=[],i=null,s=null,a=null){return new e3(e,t,r,n,i,s,a)}function e8(e){if(null===e.ce){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof ej)return t.field.canonicalString()+t.op.toString()+ek(t.value);if(eH(t)&&eW(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>ek(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>ek(e)).join(",")),e.ce=t}return e.ce}function e5(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var r,n;if(r=e.orderBy[i],n=t.orderBy[i],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof ej?r instanceof ej&&t.op===r.op&&t.field.isEqual(r.field)&&eA(t.value,r.value):t instanceof eG?r instanceof eG&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,i)=>t&&e(n,r.filters[i]),!0):void _()}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!ez(e.startAt,t.startAt)&&ez(e.endAt,t.endAt)}function e6(e){return B.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e7{constructor(e,t=null,r=[],n=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.le=null,this.he=null,this.Pe=null,this.startAt,this.endAt}}function te(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tt(e){return null!==e.collectionGroup}function tr(e){if(null===e.le){let t;e.le=[];let r=new Set;for(let t of e.explicitOrderBy)e.le.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new eh(q.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.le.push(new eK(t,n))}),r.has(q.keyField().canonicalString())||e.le.push(new eK(q.keyField(),n))}return e.le}function tn(e){return e.he||(e.he=function(e,t){if("F"===e.limitType)return e9(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new eK(e.field,t)});let r=e.endAt?new eB(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new eB(e.startAt.position,e.startAt.inclusive):null;return e9(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}(e,tr(e))),e.he}function ti(e,t){let r=e.filters.concat([t]);return new e7(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function ts(e,t,r){return new e7(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function ta(e,t){return e5(tn(e),tn(t))&&e.limitType===t.limitType}function to(e){return`${e8(tn(e))}|lt:${e.limitType}`}function tl(e){var t;let r;return`Query(target=${r=(t=tn(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof ej?`${t.field.canonicalString()} ${t.op} ${ek(t.value)}`:t instanceof eG?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>ek(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>ek(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function tu(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):B.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of tr(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=e$(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,tr(e),t))&&(!e.endAt||!!function(e,t,r){let n=e$(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,tr(e),t))}function th(e){return(t,r)=>{let n=!1;for(let i of tr(e)){let e=function(e,t,r){let n=e.field.isKeyField()?B.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),i=r.data.field(e);return null!==n&&null!==i?eD(n,i):_()}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return _()}}(i,t,r);if(0!==e)return e;n=n||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){es(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return ea(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let td=new eo(B.comparator),tf=new eo(B.comparator);function tm(...e){let t=tf;for(let r of e)t=t.insert(r.key,r);return t}function tp(e){let t=tf;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function tg(){return new tc(e=>e.toString(),(e,t)=>e.isEqual(t))}let ty=new eo(B.comparator),tw=new eh(B.comparator);function tv(...e){let t=tw;for(let r of e)t=t.add(r);return t}let t_=new eh(L);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tE(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:en(t)?"-0":t}}function tT(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(){this._=void 0}}function tS(e,t){return e instanceof tk?eR(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class tC extends tI{}class tA extends tI{constructor(e){super(),this.elements=e}}function tb(e,t){let r=tR(t);for(let t of e.elements)r.some(e=>eA(e,t))||r.push(t);return{arrayValue:{values:r}}}class tD extends tI{constructor(e){super(),this.elements=e}}function tN(e,t){let r=tR(t);for(let t of e.elements)r=r.filter(e=>!eA(e,t));return{arrayValue:{values:r}}}class tk extends tI{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function tx(e){return ey(e.integerValue||e.doubleValue)}function tR(e){return eL(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tL{constructor(e,t){this.field=e,this.transform=t}}class tV{constructor(e,t){this.version=e,this.transformResults=t}}class tO{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tO}static exists(e){return new tO(void 0,e)}static updateTime(e){return new tO(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tM(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class tF{}function tP(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new tj(e.key,tO.none()):new tB(e.key,e.data,tO.none());{let r=e.data,n=eU.empty(),i=new eh(q.comparator);for(let e of t.fields)if(!i.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),i=i.add(e)}return new t$(e.key,n,new ed(i.toArray()),tO.none())}}function tU(e,t,r,n){return e instanceof tB?function(e,t,r,n){if(!tM(e.precondition,t))return r;let i=e.value.clone(),s=tQ(e.fieldTransforms,n,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,r,n):e instanceof t$?function(e,t,r,n){if(!tM(e.precondition,t))return r;let i=tQ(e.fieldTransforms,n,t),s=t.data;return(s.setAll(tz(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):tM(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function tq(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&V(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof tA&&n instanceof tA||r instanceof tD&&n instanceof tD?V(r.elements,n.elements,eA):r instanceof tk&&n instanceof tk?eA(r.Ie,n.Ie):r instanceof tC&&n instanceof tC)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class tB extends tF{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class t$ extends tF{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function tz(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function tK(e,t,r){var n;let i=new Map;e.length===r.length||_();for(let s=0;s<r.length;s++){let a=e[s],o=a.transform,l=t.data.field(a.field);i.set(a.field,(n=r[s],o instanceof tA?tb(o,l):o instanceof tD?tN(o,l):n))}return i}function tQ(e,t,r){let n=new Map;for(let i of e){let e=i.transform,s=r.data.field(i.field);n.set(i.field,e instanceof tC?function(e,t){let r={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&ev(t)&&(t=e_(t)),t&&(r.fields.__previous_value__=t),{mapValue:r}}(t,s):e instanceof tA?tb(e,s):e instanceof tD?tN(e,s):function(e,t){let r=tS(e,t),n=tx(r)+tx(e.Ie);return eR(r)&&eR(e.Ie)?tT(n):tE(e.serializer,n)}(e,s))}return n}class tj extends tF{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class tG extends tF{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tW{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var n;n=r[t],i instanceof tB?function(e,t,r){let n=e.value.clone(),i=tK(e.fieldTransforms,t,r.transformResults);n.setAll(i),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(i,e,n):i instanceof t$?function(e,t,r){if(!tM(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=tK(e.fieldTransforms,t,r.transformResults),i=t.data;i.setAll(tz(e)),i.setAll(n),t.convertToFoundDocument(r.version,i).setHasCommittedMutations()}(i,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=tU(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=tU(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=tg();return this.mutations.forEach(n=>{let i=e.get(n.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields),o=tP(s,a=t.has(n.key)?null:a);null!==o&&r.set(n.key,o),s.isValidDocument()||s.convertToNoDocument(M.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tv())}isEqual(e){return this.batchId===e.batchId&&V(this.mutations,e.mutations,(e,t)=>tq(e,t))&&V(this.baseMutations,e.baseMutations,(e,t)=>tq(e,t))}}class tH{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){e.mutations.length===r.length||_();let n=ty,i=e.mutations;for(let e=0;e<i.length;e++)n=n.insert(i[e].key,r[e].version);return new tH(e,t,r,n)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tY{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tX{constructor(e,t){this.count=e,this.unchangedNames=t}}function tJ(e){if(void 0===e)return y("GRPC error has no .code"),E.UNKNOWN;switch(e){case n.OK:return E.OK;case n.CANCELLED:return E.CANCELLED;case n.UNKNOWN:return E.UNKNOWN;case n.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case n.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case n.INTERNAL:return E.INTERNAL;case n.UNAVAILABLE:return E.UNAVAILABLE;case n.UNAUTHENTICATED:return E.UNAUTHENTICATED;case n.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case n.NOT_FOUND:return E.NOT_FOUND;case n.ALREADY_EXISTS:return E.ALREADY_EXISTS;case n.PERMISSION_DENIED:return E.PERMISSION_DENIED;case n.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case n.ABORTED:return E.ABORTED;case n.OUT_OF_RANGE:return E.OUT_OF_RANGE;case n.UNIMPLEMENTED:return E.UNIMPLEMENTED;case n.DATA_LOSS:return E.DATA_LOSS;default:return _()}}(i=n||(n={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tZ=new u.z8([4294967295,4294967295],0);function t0(e){let t=(new TextEncoder).encode(e),r=new u.V8;return r.update(t),new Uint8Array(r.digest())}function t1(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new u.z8([r,n],0),new u.z8([i,s],0)]}class t2{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new t4(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new t4(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new t4(`Invalid padding when bitmap length is 0: ${t}`);this.Te=8*e.length-t,this.Ee=u.z8.fromNumber(this.Te)}de(e,t,r){let n=e.add(t.multiply(u.z8.fromNumber(r)));return 1===n.compare(tZ)&&(n=new u.z8([n.getBits(0),n.getBits(1)],0)),n.modulo(this.Ee).toNumber()}Ae(e){return 0!=(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.Te)return!1;let[t,r]=t1(t0(e));for(let e=0;e<this.hashCount;e++){let n=this.de(t,r,e);if(!this.Ae(n))return!1}return!0}static create(e,t,r){let n=new t2(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return r.forEach(e=>n.insert(e)),n}insert(e){if(0===this.Te)return;let[t,r]=t1(t0(e));for(let e=0;e<this.hashCount;e++){let n=this.de(t,r,e);this.Re(n)}}Re(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class t4 extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t3{constructor(e,t,r,n,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,t9.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new t3(M.min(),n,new eo(L),td,tv())}}class t9{constructor(e,t,r,n,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new t9(r,t,tv(),tv(),tv())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t8{constructor(e,t,r,n){this.Ve=e,this.removedTargetIds=t,this.key=r,this.me=n}}class t5{constructor(e,t){this.targetId=e,this.fe=t}}class t6{constructor(e,t,r=em.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class t7{constructor(){this.ge=0,this.pe=rr(),this.ye=em.EMPTY_BYTE_STRING,this.we=!1,this.Se=!0}get current(){return this.we}get resumeToken(){return this.ye}get be(){return 0!==this.ge}get De(){return this.Se}Ce(e){e.approximateByteSize()>0&&(this.Se=!0,this.ye=e)}ve(){let e=tv(),t=tv(),r=tv();return this.pe.forEach((n,i)=>{switch(i){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:_()}}),new t9(this.ye,this.we,e,t,r)}Fe(){this.Se=!1,this.pe=rr()}Me(e,t){this.Se=!0,this.pe=this.pe.insert(e,t)}xe(e){this.Se=!0,this.pe=this.pe.remove(e)}Oe(){this.ge+=1}Ne(){this.ge-=1,this.ge>=0||_()}Be(){this.Se=!0,this.we=!0}}class re{constructor(e){this.Le=e,this.ke=new Map,this.qe=td,this.Qe=rt(),this.Ke=new eo(L)}$e(e){for(let t of e.Ve)e.me&&e.me.isFoundDocument()?this.Ue(t,e.me):this.We(t,e.key,e.me);for(let t of e.removedTargetIds)this.We(t,e.key,e.me)}Ge(e){this.forEachTarget(e,t=>{let r=this.ze(t);switch(e.state){case 0:this.je(t)&&r.Ce(e.resumeToken);break;case 1:r.Ne(),r.be||r.Fe(),r.Ce(e.resumeToken);break;case 2:r.Ne(),r.be||this.removeTarget(t);break;case 3:this.je(t)&&(r.Be(),r.Ce(e.resumeToken));break;case 4:this.je(t)&&(this.He(t),r.Ce(e.resumeToken));break;default:_()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ke.forEach((e,r)=>{this.je(r)&&t(r)})}Je(e){let t=e.targetId,r=e.fe.count,n=this.Ye(t);if(n){let i=n.target;if(e6(i)){if(0===r){let e=new B(i.path);this.We(t,e,eq.newNoDocument(e,M.min()))}else 1===r||_()}else{let n=this.Ze(t);if(n!==r){let r=this.Xe(e),i=r?this.et(r,e,n):1;0!==i&&(this.He(t),this.Ke=this.Ke.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}Xe(e){let t,r;let n=e.fe.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n;try{t=ew(i).toUint8Array()}catch(e){if(e instanceof ef)return w("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new t2(t,s,a)}catch(e){return w(e instanceof t4?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.Te?null:r}et(e,t,r){return t.fe.count===r-this.rt(e,t.targetId)?0:2}rt(e,t){let r=this.Le.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let i=this.Le.nt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;e.mightContain(s)||(this.We(t,r,null),n++)}),n}it(e){let t=new Map;this.ke.forEach((r,n)=>{let i=this.Ye(n);if(i){if(r.current&&e6(i.target)){let t=new B(i.target.path);null!==this.qe.get(t)||this.st(n,t)||this.We(n,t,eq.newNoDocument(t,e))}r.De&&(t.set(n,r.ve()),r.Fe())}});let r=tv();this.Qe.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.Ye(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.qe.forEach((t,r)=>r.setReadTime(e));let n=new t3(e,t,this.Ke,this.qe,r);return this.qe=td,this.Qe=rt(),this.Ke=new eo(L),n}Ue(e,t){if(!this.je(e))return;let r=this.st(e,t.key)?2:0;this.ze(e).Me(t.key,r),this.qe=this.qe.insert(t.key,t),this.Qe=this.Qe.insert(t.key,this.ot(t.key).add(e))}We(e,t,r){if(!this.je(e))return;let n=this.ze(e);this.st(e,t)?n.Me(t,1):n.xe(t),this.Qe=this.Qe.insert(t,this.ot(t).delete(e)),r&&(this.qe=this.qe.insert(t,r))}removeTarget(e){this.ke.delete(e)}Ze(e){let t=this.ze(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Oe(e){this.ze(e).Oe()}ze(e){let t=this.ke.get(e);return t||(t=new t7,this.ke.set(e,t)),t}ot(e){let t=this.Qe.get(e);return t||(t=new eh(L),this.Qe=this.Qe.insert(e,t)),t}je(e){let t=null!==this.Ye(e);return t||g("WatchChangeAggregator","Detected inactive target",e),t}Ye(e){let t=this.ke.get(e);return t&&t.be?null:this.Le._t(e)}He(e){this.ke.set(e,new t7),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.We(e,t,null)})}st(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function rt(){return new eo(B.comparator)}function rr(){return new eo(B.comparator)}let rn={asc:"ASCENDING",desc:"DESCENDING"},ri={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},rs={and:"AND",or:"OR"};class ra{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ro(e,t){return e.useProto3Json||null==t?t:{value:t}}function rl(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ru(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function rh(e){return e||_(),M.fromTimestamp(function(e){let t=eg(e);return new O(t.seconds,t.nanos)}(e))}function rc(e,t){return rd(e,t).canonicalString()}function rd(e,t){let r=new P(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function rf(e){let t=P.fromString(e);return rT(t)||_(),t}function rm(e,t){return rc(e.databaseId,t.path)}function rp(e,t){let r=rf(t);if(r.get(1)!==e.databaseId.projectId)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new B(rw(r))}function rg(e,t){return rc(e.databaseId,t)}function ry(e){return new P(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function rw(e){return e.length>4&&"documents"===e.get(4)||_(),e.popFirst(5)}function rv(e,t,r){return{name:rm(e,t),fields:r.value.mapValue.fields}}function r_(e){return{fieldPath:e.canonicalString()}}function rE(e){return q.fromServerFormat(e.fieldPath)}function rT(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,t,r,n,i=M.min(),s=M.min(),a=em.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new rI(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rI(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rI(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rI(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e){this.ct=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(ey(e.integerValue));else if("doubleValue"in e){let r=ey(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),en(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),"string"==typeof r?t.At(r):(t.At(`${r.seconds||""}`),t.dt(r.nanos||0))}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(ew(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?eP(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):_()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};for(let e of(this.Et(t,55),Object.keys(r)))this.Rt(e,t),this.It(r[e],t)}wt(e,t){let r=e.values||[];for(let e of(this.Et(t,50),r))this.It(e,t)}gt(e,t){this.Et(t,37),B.fromName(e).path.forEach(e=>{this.Et(t,60),this.St(e,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}}rC.bt=new rC;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(){this._n=new rb}addToCollectionParentIndex(e,t){return this._n.add(t),j.resolve()}getCollectionParents(e,t){return j.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return j.resolve()}deleteFieldIndex(e,t){return j.resolve()}deleteAllFieldIndexes(e){return j.resolve()}createTargetIndexes(e,t){return j.resolve()}getDocumentsMatchingTarget(e,t){return j.resolve(null)}getIndexType(e,t){return j.resolve(0)}getFieldIndexes(e,t){return j.resolve([])}getNextCollectionGroupToUpdate(e){return j.resolve(null)}getMinOffset(e,t){return j.resolve(z.min())}getMinOffsetFromCollectionGroup(e,t){return j.resolve(z.min())}updateCollectionGroup(e,t,r){return j.resolve()}updateIndexEntries(e,t){return j.resolve()}}class rb{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new eh(P.comparator),i=!n.has(r);return this.index[t]=n.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new eh(P.comparator)).toArray()}}new Uint8Array(0);class rD{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new rD(e,rD.DEFAULT_COLLECTION_PERCENTILE,rD.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rD.DEFAULT_COLLECTION_PERCENTILE=10,rD.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rD.DEFAULT=new rD(41943040,rD.DEFAULT_COLLECTION_PERCENTILE,rD.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rD.DISABLED=new rD(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rN{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new rN(0)}static Bn(){return new rN(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{constructor(){this.changes=new tc(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,eq.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?j.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rR{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&tU(r.mutation,e,ed.empty(),O.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tv()).next(()=>t))}getLocalViewOfDocuments(e,t,r=tv()){let n=tg();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=tm();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=tg();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,tv()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let i=td,s=tg(),a=tg();return t.forEach((e,t)=>{let a=r.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof t$)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),tU(a.mutation,t,a.mutation.getFieldMask(),O.now())):s.set(t.key,ed.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var r;return a.set(e,new rx(t,null!==(r=s.get(e))&&void 0!==r?r:null))}),a))}recalculateAndSaveOverlays(e,t){let r=tg(),n=new eo((e,t)=>e-t),i=tv();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=r.get(e)||ed.empty();a=i.applyToLocalView(s,a),r.set(e,a);let o=(n.get(i.batchId)||tv()).add(e);n=n.insert(i.batchId,o)})}).next(()=>{let s=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,l=n.value,u=tg();l.forEach(e=>{if(!i.has(e)){let n=tP(t.get(e),r.get(e));null!==n&&u.set(e,n),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return j.waitFor(s)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return B.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):tt(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(i=>{let s=n-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-i.size):j.resolve(tg()),a=-1,o=i;return s.next(t=>j.forEach(t,(t,r)=>(a<r.largestBatchId&&(a=r.largestBatchId),i.get(t)?j.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,tv())).next(e=>({batchId:a,changes:tp(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(e=>{let t=tm();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let i=t.collectionGroup,s=tm();return this.indexManager.getCollectionParents(e,i).next(a=>j.forEach(a,a=>{let o=new e7(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,r,n).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r,n){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,n))).next(e=>{i.forEach((t,r)=>{let n=r.getKey();null===e.get(n)&&(e=e.insert(n,eq.newInvalidDocument(n)))});let r=tm();return e.forEach((e,n)=>{let s=i.get(e);void 0!==s&&tU(s.mutation,n,ed.empty(),O.now()),tu(t,n)&&(r=r.insert(e,n))}),r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rL{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return j.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,{id:t.id,version:t.version,createTime:rh(t.createTime)}),j.resolve()}getNamedQuery(e,t){return j.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let r,n=function(e){let t=rf(e);return 4===t.length?P.emptyPath():rw(t)}(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){1===s||_();let e=i.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];i.where&&(o=function(e){var t;let r=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rE(e.unaryFilter.field);return ej.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=rE(e.unaryFilter.field);return ej.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=rE(e.unaryFilter.field);return ej.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=rE(e.unaryFilter.field);return ej.create(i,"!=",{nullValue:"NULL_VALUE"});default:return _()}}(t):void 0!==t.fieldFilter?ej.create(rE(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return _()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?eG.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return _()}}(t.compositeFilter.op)):_()}(e);return r instanceof eG&&eH(t=r)&&eW(t)?r.getFilters():[r]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new eK(rE(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=null==(r="object"==typeof(t=i.limit)?t.value:t)?null:r);let h=null;i.startAt&&(h=function(e){let t=!!e.before;return new eB(e.values||[],t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before;return new eB(e.values||[],t)}(i.endAt)),new e7(n,a,l,o,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ts(t,t.limit,"L"):t}(t.bundledQuery),readTime:rh(t.readTime)}),j.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rV{constructor(){this.overlays=new eo(B.comparator),this.hr=new Map}getOverlay(e,t){return j.resolve(this.overlays.get(t))}getOverlays(e,t){let r=tg();return j.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.ht(e,t,n)}),j.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.hr.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.hr.delete(r)),j.resolve()}getOverlaysForCollection(e,t,r){let n=tg(),i=t.length+1,s=new B(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>r&&n.set(e.getKey(),e)}return j.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let i=new eo((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=i.get(e.largestBatchId);null===t&&(t=tg(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tg(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return j.resolve(a)}ht(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.hr.get(n.largestBatchId).delete(r.key);this.hr.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new tY(t,r));let i=this.hr.get(t);void 0===i&&(i=tv(),this.hr.set(t,i)),this.hr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rO{constructor(){this.Pr=new eh(rM.Ir),this.Tr=new eh(rM.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new rM(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Ar(new rM(e,t))}Rr(e,t){e.forEach(e=>this.removeReference(e,t))}Vr(e){let t=new B(new P([])),r=new rM(t,e),n=new rM(t,e+1),i=[];return this.Tr.forEachInRange([r,n],e=>{this.Ar(e),i.push(e.key)}),i}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new B(new P([])),r=new rM(t,e),n=new rM(t,e+1),i=tv();return this.Tr.forEachInRange([r,n],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new rM(e,0),r=this.Pr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class rM{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return B.comparator(e.key,t.key)||L(e.pr,t.pr)}static Er(e,t){return L(e.pr,t.pr)||B.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rF{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new eh(rM.Ir)}checkEmpty(e){return j.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let i=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new tW(i,t,r,n);for(let t of(this.mutationQueue.push(s),n))this.wr=this.wr.add(new rM(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return j.resolve(s)}lookupMutationBatch(e,t){return j.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.br(t+1),n=r<0?0:r;return j.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(0===this.mutationQueue.length?-1:this.yr-1)}getAllMutationBatches(e){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new rM(t,0),n=new rM(t,Number.POSITIVE_INFINITY),i=[];return this.wr.forEachInRange([r,n],e=>{let t=this.Sr(e.pr);i.push(t)}),j.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new eh(L);return t.forEach(e=>{let t=new rM(e,0),n=new rM(e,Number.POSITIVE_INFINITY);this.wr.forEachInRange([t,n],e=>{r=r.add(e.pr)})}),j.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=r;B.isDocumentKey(i)||(i=i.child(""));let s=new rM(new B(i),0),a=new eh(L);return this.wr.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.pr)),!0)},s),j.resolve(this.Dr(a))}Dr(e){let t=[];return e.forEach(e=>{let r=this.Sr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){0===this.Cr(t.batchId,"removed")||_(),this.mutationQueue.shift();let r=this.wr;return j.forEach(t.mutations,n=>{let i=new rM(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new rM(t,0),n=this.wr.firstAfterOrEqual(r);return j.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,j.resolve()}Cr(e,t){return this.br(e)}br(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rP{constructor(e){this.vr=e,this.docs=new eo(B.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),i=n?n.size:0,s=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return j.resolve(r?r.document.mutableCopy():eq.newInvalidDocument(t))}getEntries(e,t){let r=td;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():eq.newInvalidDocument(e))}),j.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let i=td,s=t.path,a=new B(s.child("")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=B.comparator(e.documentKey,t.documentKey))?r:L(e.largestBatchId,t.largestBatchId)}(new z(a.readTime,a.key,-1),r)||(n.has(a.key)||tu(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return j.resolve(i)}getAllFromCollectionGroup(e,t,r,n){_()}Fr(e,t){return j.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new rU(this)}getSize(e){return j.resolve(this.size)}}class rU extends rk{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.ar.addEntry(e,n)):this.ar.removeEntry(r)}),j.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rq{constructor(e){this.persistence=e,this.Mr=new tc(e=>e8(e),e5),this.lastRemoteSnapshotVersion=M.min(),this.highestTargetId=0,this.Or=0,this.Nr=new rO,this.targetCount=0,this.Br=rN.Nn()}forEachTarget(e,t){return this.Mr.forEach((e,r)=>t(r)),j.resolve()}getLastRemoteSnapshotVersion(e){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return j.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Br.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),j.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Br=new rN(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,j.resolve()}updateTargetData(e,t){return this.qn(t),j.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,j.resolve()}removeTargets(e,t,r){let n=0,i=[];return this.Mr.forEach((s,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.Mr.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),j.waitFor(i).next(()=>n)}getTargetCount(e){return j.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return j.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),j.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let n=this.persistence.referenceDelegate,i=[];return n&&t.forEach(t=>{i.push(n.markPotentiallyOrphaned(e,t))}),j.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),j.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return j.resolve(r)}containsKey(e,t){return j.resolve(this.Nr.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rB{constructor(e,t){this.Lr={},this.overlays={},this.kr=new er(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new rq(this),this.indexManager=new rA,this.remoteDocumentCache=new rP(e=>this.referenceDelegate.Kr(e)),this.serializer=new rS(t),this.$r=new rL(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new rV,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Lr[e.toKey()];return r||(r=new rF(t,this.referenceDelegate),this.Lr[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){g("MemoryPersistence","Starting transaction:",e);let n=new r$(this.kr.next());return this.referenceDelegate.Ur(),r(n).next(e=>this.referenceDelegate.Wr(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Gr(e,t){return j.or(Object.values(this.Lr).map(r=>()=>r.containsKey(e,t)))}}class r$ extends K{constructor(e){super(),this.currentSequenceNumber=e}}class rz{constructor(e){this.persistence=e,this.zr=new rO,this.jr=null}static Hr(e){return new rz(e)}get Jr(){if(this.jr)return this.jr;throw _()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),j.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),j.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),j.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(e=>this.Jr.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Jr.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.Jr,r=>{let n=B.fromPath(r);return this.Yr(e,n).next(e=>{e||t.removeEntry(n,M.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(e=>{e?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return j.or([()=>j.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rK{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=n}static Ki(e,t){let r=tv(),n=tv();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new rK(e,t.fromCache,r,n)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rQ{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rj{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=(0,l.G6)()?8:W.v((0,l.z$)())>0?6:4}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,n){let i={result:null};return this.ji(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Hi(e,t,n,r).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let r=new rQ;return this.Ji(e,t,r).next(n=>{if(i.result=n,this.Ui)return this.Yi(e,t,r,n.size)})}).next(()=>i.result)}Yi(e,t,r,n){return r.documentReadCount<this.Wi?(p()<=o.in.DEBUG&&g("QueryEngine","SDK will not create cache indexes for query:",tl(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),j.resolve()):(p()<=o.in.DEBUG&&g("QueryEngine","Query:",tl(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.Gi*n?(p()<=o.in.DEBUG&&g("QueryEngine","The SDK decides to create cache indexes for query:",tl(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tn(t))):j.resolve())}ji(e,t){if(te(t))return j.resolve(null);let r=tn(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(r=tn(t=ts(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{let i=tv(...n);return this.zi.getDocuments(e,i).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{let s=this.Zi(t,n);return this.Xi(t,s,i,r.readTime)?this.ji(e,ts(t,null,"F")):this.es(e,s,t,r)}))})))}Hi(e,t,r,n){return te(t)||n.isEqual(M.min())?j.resolve(null):this.zi.getDocuments(e,r).next(i=>{let s=this.Zi(t,i);return this.Xi(t,s,r,n)?j.resolve(null):(p()<=o.in.DEBUG&&g("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),tl(t)),this.es(e,s,t,function(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1;return new z(M.fromTimestamp(1e9===n?new O(r+1,0):new O(r,n)),B.empty(),-1)}(n,0)).next(e=>e))})}Zi(e,t){let r=new eh(th(e));return t.forEach((t,n)=>{tu(e,n)&&(r=r.add(n))}),r}Xi(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(n)>0)}Ji(e,t,r){return p()<=o.in.DEBUG&&g("QueryEngine","Using full collection scan to execute query:",tl(t)),this.zi.getDocumentsMatchingQuery(e,t,z.min(),r)}es(e,t,r,n){return this.zi.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rG{constructor(e,t,r,n){this.persistence=e,this.ts=t,this.serializer=n,this.ns=new eo(L),this.rs=new tc(e=>e8(e),e5),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new rR(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}}async function rW(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(i=>(n=i,e._s(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let i=[],s=[],a=tv();for(let e of n)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(r,a).next(e=>({us:e,removedBatchIds:i,addedBatchIds:s}))})})}function rH(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}async function rY(e,t,r){let n=e.ns.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!X(e))throw e;g("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}e.ns=e.ns.remove(t),e.rs.delete(n.target)}function rX(e,t,r){let n=M.min(),i=tv();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,r){let n=e.rs.get(r);return void 0!==n?j.resolve(e.ns.get(n)):e.Qr.getTargetData(t,r)})(e,s,tn(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.Qr.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.ts.getDocumentsMatchingQuery(s,t,r?n:M.min(),r?i:tv())).next(r=>{var n;let s;return n=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.ss.get(n)||M.min(),r.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.ss.set(n,s),{documents:r,hs:i}}))}class rJ{constructor(){this.activeTargetIds=t_}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class rZ{constructor(){this.no=new rJ,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new rJ,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r0{io(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r1{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){for(let e of(g("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.uo))e(0)}ao(){for(let e of(g("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.uo))e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r2=null;function r4(){return null===r2?r2=268435456+Math.round(2147483648*Math.random()):r2++,"0x"+r2.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r3={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r9{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}onMessage(e){this.Ao=e}close(){this.ho()}send(e){this.lo(e)}Ro(){this.Io()}Vo(e){this.Eo(e)}mo(e){this.Ao(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r8="WebChannelConnection";class r5 extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.fo=t+"://"+e.host,this.po=`projects/${r}/databases/${n}`,this.yo="(default)"===this.databaseId.database?`project_id=${r}`:`project_id=${r}&database_id=${n}`}get wo(){return!1}So(e,t,r,n,i){let s=r4(),a=this.bo(e,t.toUriEncodedString());g("RestConnection",`Sending RPC '${e}' ${s}:`,a,r);let o={"google-cloud-resource-prefix":this.po,"x-goog-request-params":this.yo};return this.Do(o,n,i),this.Co(e,a,o,r).then(t=>(g("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw w("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",r),t})}vo(e,t,r,n,i,s){return this.So(e,t,r,n,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+f}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}bo(e,t){let r=r3[e];return`${this.fo}/v1/${t}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Co(e,t,r,n){let i=r4();return new Promise((s,a)=>{let o=new u.JJ;o.setWithCredentials(!0),o.listenOnce(u.tw.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case u.jK.NO_ERROR:let t=o.getResponseJson();g(r8,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case u.jK.TIMEOUT:g(r8,`RPC '${e}' ${i} timed out`),a(new T(E.DEADLINE_EXCEEDED,"Request time out"));break;case u.jK.HTTP_ERROR:let r=o.getStatus();if(g(r8,`RPC '${e}' ${i} failed with status:`,r,"response text:",o.getResponseText()),r>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(E).indexOf(t)>=0?t:E.UNKNOWN}(t.status);a(new T(e,t.message))}else a(new T(E.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new T(E.UNAVAILABLE,"Connection failed."));break;default:_()}}finally{g(r8,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(n);g(r8,`RPC '${e}' ${i} sending request:`,n),o.send(t,"POST",l,r,15)})}Fo(e,t,r){let i=r4(),s=[this.fo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=(0,u.UE)(),o=(0,u.FJ)(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;void 0!==h&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let c=s.join("");g(r8,`Creating RPC '${e}' stream ${i}: ${c}`,l);let d=a.createWebChannel(c,l),f=!1,m=!1,p=new r9({lo:t=>{m?g(r8,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(f||(g(r8,`Opening RPC '${e}' stream ${i} transport.`),d.open(),f=!0),g(r8,`RPC '${e}' stream ${i} sending:`,t),d.send(t))},ho:()=>d.close()}),y=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return y(d,u.ii.EventType.OPEN,()=>{m||g(r8,`RPC '${e}' stream ${i} transport opened.`)}),y(d,u.ii.EventType.CLOSE,()=>{m||(m=!0,g(r8,`RPC '${e}' stream ${i} transport closed`),p.Vo())}),y(d,u.ii.EventType.ERROR,t=>{m||(m=!0,w(r8,`RPC '${e}' stream ${i} transport errored:`,t),p.Vo(new T(E.UNAVAILABLE,"The operation could not be completed")))}),y(d,u.ii.EventType.MESSAGE,t=>{var r;if(!m){let s=t.data[0];s||_();let a=s.error||(null===(r=s[0])||void 0===r?void 0:r.error);if(a){g(r8,`RPC '${e}' stream ${i} received error:`,a);let t=a.status,r=function(e){let t=n[e];if(void 0!==t)return tJ(t)}(t),s=a.message;void 0===r&&(r=E.INTERNAL,s="Unknown error status: "+t+" with message "+a.message),m=!0,p.Vo(new T(r,s)),d.close()}else g(r8,`RPC '${e}' stream ${i} received:`,s),p.mo(s)}}),y(o,u.ju.STAT_EVENT,t=>{t.stat===u.kN.PROXY?g(r8,`RPC '${e}' stream ${i} detected buffering proxy`):t.stat===u.kN.NOPROXY&&g(r8,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{p.Ro()},0),p}}function r6(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r7(e){return new ra(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,t,r=1e3,n=1.5,i=6e4){this.oi=e,this.timerId=t,this.Mo=r,this.xo=n,this.Oo=i,this.No=0,this.Bo=null,this.Lo=Date.now(),this.reset()}reset(){this.No=0}ko(){this.No=this.Oo}qo(e){this.cancel();let t=Math.floor(this.No+this.Qo()),r=Math.max(0,Date.now()-this.Lo),n=Math.max(0,t-r);n>0&&g("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.No} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Bo=this.oi.enqueueAfterDelay(this.timerId,n,()=>(this.Lo=Date.now(),e())),this.No*=this.xo,this.No<this.Mo&&(this.No=this.Mo),this.No>this.Oo&&(this.No=this.Oo)}Ko(){null!==this.Bo&&(this.Bo.skipDelay(),this.Bo=null)}cancel(){null!==this.Bo&&(this.Bo.cancel(),this.Bo=null)}Qo(){return(Math.random()-.5)*this.No}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t,r,n,i,s,a,o){this.oi=e,this.$o=r,this.Uo=n,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.Wo=0,this.Go=null,this.zo=null,this.stream=null,this.jo=new ne(e,t)}Ho(){return 1===this.state||5===this.state||this.Jo()}Jo(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Yo()}async stop(){this.Ho()&&await this.close(0)}Zo(){this.state=0,this.jo.reset()}Xo(){this.Jo()&&null===this.Go&&(this.Go=this.oi.enqueueAfterDelay(this.$o,6e4,()=>this.e_()))}t_(e){this.n_(),this.stream.send(e)}async e_(){if(this.Jo())return this.close(0)}n_(){this.Go&&(this.Go.cancel(),this.Go=null)}r_(){this.zo&&(this.zo.cancel(),this.zo=null)}async close(e,t){this.n_(),this.r_(),this.jo.cancel(),this.Wo++,4!==e?this.jo.reset():t&&t.code===E.RESOURCE_EXHAUSTED?(y(t.toString()),y("Using maximum backoff delay to prevent overloading the backend."),this.jo.ko()):t&&t.code===E.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.i_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.To(t)}i_(){}auth(){this.state=1;let e=this.s_(this.Wo),t=this.Wo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.Wo===t&&this.o_(e,r)},t=>{e(()=>{let e=new T(E.UNKNOWN,"Fetching auth token failed: "+t.message);return this.__(e)})})}o_(e,t){let r=this.s_(this.Wo);this.stream=this.a_(e,t),this.stream.Po(()=>{r(()=>(this.state=2,this.zo=this.oi.enqueueAfterDelay(this.Uo,1e4,()=>(this.Jo()&&(this.state=3),Promise.resolve())),this.listener.Po()))}),this.stream.To(e=>{r(()=>this.__(e))}),this.stream.onMessage(e=>{r(()=>this.onMessage(e))})}Yo(){this.state=5,this.jo.qo(async()=>{this.state=0,this.start()})}__(e){return g("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}s_(e){return t=>{this.oi.enqueueAndForget(()=>this.Wo===e?t():(g("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nr extends nt{constructor(e,t,r,n,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}a_(e,t){return this.connection.Fo("Listen",e,t)}onMessage(e){this.jo.reset();let t=function(e,t){let r;if("targetChange"in t){var n,i;t.targetChange;let s="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:_(),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(void 0===i||"string"==typeof i||_(),em.fromBase64String(i||"")):(void 0===i||i instanceof Uint8Array||_(),em.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause;r=new t6(s,a,o,l&&new T(void 0===l.code?E.UNKNOWN:tJ(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let i=rp(e,n.document.name),s=rh(n.document.updateTime),a=n.document.createTime?rh(n.document.createTime):M.min(),o=new eU({mapValue:{fields:n.document.fields}}),l=eq.newFoundDocument(i,s,a,o);r=new t8(n.targetIds||[],n.removedTargetIds||[],l.key,l)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let i=rp(e,n.document),s=n.readTime?rh(n.readTime):M.min(),a=eq.newNoDocument(i,s);r=new t8([],n.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let i=rp(e,n.document);r=new t8([],n.removedTargetIds||[],i,null)}else{if(!("filter"in t))return _();{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:i}=e,s=new tX(n,i);r=new t5(e.targetId,s)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return M.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?M.min():t.readTime?rh(t.readTime):M.min()}(e);return this.listener.u_(t,r)}c_(e){let t={};t.database=ry(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=e6(n)?{documents:{documents:[rg(e,n.path)]}}:{query:function(e,t){var r,n;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=rg(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof ej?function(e){if("=="===e.op){if(eO(e.value))return{unaryFilter:{field:r_(e.field),op:"IS_NAN"}};if(eV(e.value))return{unaryFilter:{field:r_(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(eO(e.value))return{unaryFilter:{field:r_(e.field),op:"IS_NOT_NAN"}};if(eV(e.value))return{unaryFilter:{field:r_(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:r_(e.field),op:ri[e.op],value:e.value}}}(t):t instanceof eG?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:rs[t.op],filters:r}}}(t):_()}(eG.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:r_(e.field),direction:rn[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=ro(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(s.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{ut:s,parent:i}}(e,n).ut}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=ru(e,t.resumeToken);let n=ro(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(M.min())>0){r.readTime=rl(e,t.snapshotVersion.toTimestamp());let n=ro(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return _()}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.t_(t)}l_(e){let t={};t.database=ry(this.serializer),t.removeTarget=e,this.t_(t)}}class nn extends nt{constructor(e,t,r,n,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i,this.h_=!1}get P_(){return this.h_}start(){this.h_=!1,this.lastStreamToken=void 0,super.start()}i_(){this.h_&&this.I_([])}a_(e,t){return this.connection.Fo("Write",e,t)}onMessage(e){var t,r;if(e.streamToken||_(),this.lastStreamToken=e.streamToken,this.h_){this.jo.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(void 0!==r||_(),t.map(e=>{let t;return(t=e.updateTime?rh(e.updateTime):rh(r)).isEqual(M.min())&&(t=rh(r)),new tV(t,e.transformResults||[])})):[]),i=rh(e.commitTime);return this.listener.T_(i,n)}return e.writeResults&&0!==e.writeResults.length&&_(),this.h_=!0,this.listener.E_()}d_(){let e={};e.database=ry(this.serializer),this.t_(e)}I_(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof tB)n={update:rv(e,t.key,t.value)};else if(t instanceof tj)n={delete:rm(e,t.key)};else if(t instanceof t$)n={update:rv(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof tG))return _();n={verify:rm(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof tC)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof tA)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof tD)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof tk)return{fieldPath:t.field.canonicalString(),increment:r.Ie};throw _()})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:rl(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:_()),n})(this.serializer,e))};this.t_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni extends class{}{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.A_=!1}R_(){if(this.A_)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,n){return this.R_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.So(e,rd(t,r),n,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}vo(e,t,r,n,i){return this.R_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.vo(e,rd(t,r),n,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}terminate(){this.A_=!0,this.connection.terminate()}}class ns{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.m_=0,this.f_=null,this.g_=!0}p_(){0===this.m_&&(this.y_("Unknown"),this.f_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.f_=null,this.w_("Backend didn't respond within 10 seconds."),this.y_("Offline"),Promise.resolve())))}S_(e){"Online"===this.state?this.y_("Unknown"):(this.m_++,this.m_>=1&&(this.b_(),this.w_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.y_("Offline")))}set(e){this.b_(),this.m_=0,"Online"===e&&(this.g_=!1),this.y_(e)}y_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}w_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.g_?(y(t),this.g_=!1):g("OnlineStateTracker",t)}b_(){null!==this.f_&&(this.f_.cancel(),this.f_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,r,n,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.D_=[],this.C_=new Map,this.v_=new Set,this.F_=[],this.M_=i,this.M_.io(e=>{r.enqueueAndForget(async()=>{np(this)&&(g("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.v_.add(4),await nl(e),e.x_.set("Unknown"),e.v_.delete(4),await no(e)}(this))})}),this.x_=new ns(r,n)}}async function no(e){if(np(e))for(let t of e.F_)await t(!0)}async function nl(e){for(let t of e.F_)await t(!1)}function nu(e,t){e.C_.has(t.targetId)||(e.C_.set(t.targetId,t),nm(e)?nf(e):nk(e).Jo()&&nc(e,t))}function nh(e,t){let r=nk(e);e.C_.delete(t),r.Jo()&&nd(e,t),0===e.C_.size&&(r.Jo()?r.Xo():np(e)&&e.x_.set("Unknown"))}function nc(e,t){if(e.O_.Oe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(M.min())>0){let r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}nk(e).c_(t)}function nd(e,t){e.O_.Oe(t),nk(e).l_(t)}function nf(e){e.O_=new re({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),_t:t=>e.C_.get(t)||null,nt:()=>e.datastore.serializer.databaseId}),nk(e).start(),e.x_.p_()}function nm(e){return np(e)&&!nk(e).Ho()&&e.C_.size>0}function np(e){return 0===e.v_.size}async function ng(e){e.C_.forEach((t,r)=>{nc(e,t)})}async function ny(e,t){e.O_=void 0,nm(e)?(e.x_.S_(t),nf(e)):e.x_.set("Unknown")}async function nw(e,t,r){if(e.x_.set("Online"),t instanceof t6&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e.C_.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.C_.delete(n),e.O_.removeTarget(n))}(e,t)}catch(r){g("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await nv(e,r)}else if(t instanceof t8?e.O_.$e(t):t instanceof t5?e.O_.Je(t):e.O_.Ge(t),!r.isEqual(M.min()))try{let t=await rH(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.O_.it(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let i=e.C_.get(n);i&&e.C_.set(n,i.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e.C_.get(t);if(!n)return;e.C_.set(t,n.withResumeToken(em.EMPTY_BYTE_STRING,n.snapshotVersion)),nd(e,t);let i=new rI(n.target,t,r,n.sequenceNumber);nc(e,i)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){g("RemoteStore","Failed to raise snapshot:",t),await nv(e,t)}}async function nv(e,t,r){if(!X(t))throw t;e.v_.add(1),await nl(e),e.x_.set("Offline"),r||(r=()=>rH(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{g("RemoteStore","Retrying IndexedDB access"),await r(),e.v_.delete(1),await no(e)})}function n_(e,t){return t().catch(r=>nv(e,r,t))}async function nE(e){let t=nx(e),r=e.D_.length>0?e.D_[e.D_.length-1].batchId:-1;for(;np(e)&&e.D_.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.D_.length&&t.Xo();break}r=n.batchId,function(e,t){e.D_.push(t);let r=nx(e);r.Jo()&&r.P_&&r.I_(t.mutations)}(e,n)}catch(t){await nv(e,t)}nT(e)&&nI(e)}function nT(e){return np(e)&&!nx(e).Ho()&&e.D_.length>0}function nI(e){nx(e).start()}async function nS(e){nx(e).d_()}async function nC(e){let t=nx(e);for(let r of e.D_)t.I_(r.mutations)}async function nA(e,t,r){let n=e.D_.shift(),i=tH.from(n,t,r);await n_(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await nE(e)}async function nb(e,t){t&&nx(e).P_&&await async function(e,t){var r;if(function(e){switch(e){default:return _();case E.CANCELLED:case E.UNKNOWN:case E.DEADLINE_EXCEEDED:case E.RESOURCE_EXHAUSTED:case E.INTERNAL:case E.UNAVAILABLE:case E.UNAUTHENTICATED:return!1;case E.INVALID_ARGUMENT:case E.NOT_FOUND:case E.ALREADY_EXISTS:case E.PERMISSION_DENIED:case E.FAILED_PRECONDITION:case E.ABORTED:case E.OUT_OF_RANGE:case E.UNIMPLEMENTED:case E.DATA_LOSS:return!0}}(r=t.code)&&r!==E.ABORTED){let r=e.D_.shift();nx(e).Zo(),await n_(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await nE(e)}}(e,t),nT(e)&&nI(e)}async function nD(e,t){e.asyncQueue.verifyOperationInProgress(),g("RemoteStore","RemoteStore received new credentials");let r=np(e);e.v_.add(3),await nl(e),r&&e.x_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.v_.delete(3),await no(e)}async function nN(e,t){t?(e.v_.delete(2),await no(e)):t||(e.v_.add(2),await nl(e),e.x_.set("Unknown"))}function nk(e){var t,r,n;return e.N_||(e.N_=(t=e.datastore,r=e.asyncQueue,n={Po:ng.bind(null,e),To:ny.bind(null,e),u_:nw.bind(null,e)},t.R_(),new nr(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.F_.push(async t=>{t?(e.N_.Zo(),nm(e)?nf(e):e.x_.set("Unknown")):(await e.N_.stop(),e.O_=void 0)})),e.N_}function nx(e){var t,r,n;return e.B_||(e.B_=(t=e.datastore,r=e.asyncQueue,n={Po:nS.bind(null,e),To:nb.bind(null,e),E_:nC.bind(null,e),T_:nA.bind(null,e)},t.R_(),new nn(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.F_.push(async t=>{t?(e.B_.Zo(),await nE(e)):(await e.B_.stop(),e.D_.length>0&&(g("RemoteStore",`Stopping write stream with ${e.D_.length} pending writes`),e.D_=[]))})),e.B_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{constructor(e,t,r,n,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=i,this.deferred=new I,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,i){let s=new nR(e,t,Date.now()+r,n,i);return s.start(r),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new T(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nL(e,t){if(y("AsyncQueue",`${t}: ${e}`),X(e))return new T(E.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV{constructor(e){this.comparator=e?(t,r)=>e(t,r)||B.comparator(t.key,r.key):(e,t)=>B.comparator(e.key,t.key),this.keyedMap=tm(),this.sortedSet=new eo(this.comparator)}static emptySet(e){return new nV(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof nV)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new nV;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{constructor(){this.L_=new eo(B.comparator)}track(e){let t=e.doc.key,r=this.L_.get(t);r?0!==e.type&&3===r.type?this.L_=this.L_.insert(t,e):3===e.type&&1!==r.type?this.L_=this.L_.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.L_=this.L_.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.L_=this.L_.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.L_=this.L_.remove(t):1===e.type&&2===r.type?this.L_=this.L_.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.L_=this.L_.insert(t,{type:2,doc:e.doc}):_():this.L_=this.L_.insert(t,e)}k_(){let e=[];return this.L_.inorderTraversal((t,r)=>{e.push(r)}),e}}class nM{constructor(e,t,r,n,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,n,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new nM(e,t,nV.emptySet(t),s,r,n,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ta(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nF{constructor(){this.q_=void 0,this.Q_=[]}}class nP{constructor(){this.queries=new tc(e=>to(e),ta),this.onlineState="Unknown",this.K_=new Set}}async function nU(e,t){let r=t.query,n=!1,i=e.queries.get(r);if(i||(n=!0,i=new nF),n)try{i.q_=await e.onListen(r)}catch(r){let e=nL(r,`Initialization of query '${tl(t.query)}' failed`);return void t.onError(e)}e.queries.set(r,i),i.Q_.push(t),t.U_(e.onlineState),i.q_&&t.W_(i.q_)&&nz(e)}async function nq(e,t){let r=t.query,n=!1,i=e.queries.get(r);if(i){let e=i.Q_.indexOf(t);e>=0&&(i.Q_.splice(e,1),n=0===i.Q_.length)}if(n)return e.queries.delete(r),e.onUnlisten(r)}function nB(e,t){let r=!1;for(let n of t){let t=n.query,i=e.queries.get(t);if(i){for(let e of i.Q_)e.W_(n)&&(r=!0);i.q_=n}}r&&nz(e)}function n$(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.Q_)e.onError(r);e.queries.delete(t)}function nz(e){e.K_.forEach(e=>{e.next()})}class nK{constructor(e,t,r){this.query=e,this.G_=t,this.z_=!1,this.j_=null,this.onlineState="Unknown",this.options=r||{}}W_(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new nM(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.z_?this.H_(e)&&(this.G_.next(e),t=!0):this.J_(e,this.onlineState)&&(this.Y_(e),t=!0),this.j_=e,t}onError(e){this.G_.error(e)}U_(e){this.onlineState=e;let t=!1;return this.j_&&!this.z_&&this.J_(this.j_,e)&&(this.Y_(this.j_),t=!0),t}J_(e,t){return!e.fromCache||(!this.options.Z_||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}H_(e){if(e.docChanges.length>0)return!0;let t=this.j_&&this.j_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}Y_(e){e=nM.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.z_=!0,this.G_.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{constructor(e){this.key=e}}class nj{constructor(e){this.key=e}}class nG{constructor(e,t){this.query=e,this.oa=t,this._a=null,this.hasCachedResults=!1,this.current=!1,this.aa=tv(),this.mutatedKeys=tv(),this.ua=th(e),this.ca=new nV(this.ua)}get la(){return this.oa}ha(e,t){let r=t?t.Pa:new nO,n=t?t.ca:this.ca,i=t?t.mutatedKeys:this.mutatedKeys,s=n,a=!1,o="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=tu(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.Ia(u,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.ua(h,o)>0||l&&0>this.ua(h,l))&&(a=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),r.track({type:1,doc:e})}return{ca:s,Pa:r,Xi:a,mutatedKeys:i}}Ia(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let i=this.ca;this.ca=e.ca,this.mutatedKeys=e.mutatedKeys;let s=e.Pa.k_();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return _()}};return r(e)-r(t)})(e.type,t.type)||this.ua(e.doc,t.doc)),this.Ta(r),n=null!=n&&n;let a=t&&!n?this.Ea():[],o=0===this.aa.size&&this.current&&!n?1:0,l=o!==this._a;return(this._a=o,0!==s.length||l)?{snapshot:new nM(this.query,e.ca,i,s,e.mutatedKeys,0===o,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),da:a}:{da:a}}U_(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({ca:this.ca,Pa:new nO,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{da:[]}}Aa(e){return!this.oa.has(e)&&!!this.ca.has(e)&&!this.ca.get(e).hasLocalMutations}Ta(e){e&&(e.addedDocuments.forEach(e=>this.oa=this.oa.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.oa=this.oa.delete(e)),this.current=e.current)}Ea(){if(!this.current)return[];let e=this.aa;this.aa=tv(),this.ca.forEach(e=>{this.Aa(e.key)&&(this.aa=this.aa.add(e.key))});let t=[];return e.forEach(e=>{this.aa.has(e)||t.push(new nj(e))}),this.aa.forEach(r=>{e.has(r)||t.push(new nQ(r))}),t}Ra(e){this.oa=e.hs,this.aa=tv();let t=this.ha(e.documents);return this.applyChanges(t,!0)}Va(){return nM.fromInitialDocuments(this.query,this.ca,this.mutatedKeys,0===this._a,this.hasCachedResults)}}class nW{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class nH{constructor(e){this.key=e,this.ma=!1}}class nY{constructor(e,t,r,n,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.fa={},this.ga=new tc(e=>to(e),ta),this.pa=new Map,this.ya=new Set,this.wa=new eo(B.comparator),this.Sa=new Map,this.ba=new rO,this.Da={},this.Ca=new Map,this.va=rN.Bn(),this.onlineState="Unknown",this.Fa=void 0}get isPrimaryClient(){return!0===this.Fa}}async function nX(e,t){var r,n;let i,s;let a=(e.remoteStore.remoteSyncer.applyRemoteEvent=n1.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=is.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=n4.bind(null,e),e.fa.u_=nB.bind(null,e.eventManager),e.fa.xa=n$.bind(null,e.eventManager),e),o=a.ga.get(t);if(o)i=o.targetId,a.sharedClientState.addLocalQueryTarget(i),s=o.view.Va();else{let e=await (r=a.localStore,n=tn(t),r.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return r.Qr.getTargetData(e,n).next(i=>i?(t=i,j.resolve(t)):r.Qr.allocateTargetId(e).next(i=>(t=new rI(n,i,"TargetPurposeListen",e.currentSequenceNumber),r.Qr.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=r.ns.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(r.ns=r.ns.insert(e.targetId,e),r.rs.set(n,e.targetId)),e})),o=a.sharedClientState.addLocalQueryTarget(e.targetId);i=e.targetId,s=await nJ(a,t,i,"current"===o,e.resumeToken),a.isPrimaryClient&&nu(a.remoteStore,e)}return s}async function nJ(e,t,r,n,i){e.Ma=(t,r,n)=>(async function(e,t,r,n){let i=t.view.ha(r);i.Xi&&(i=await rX(e.localStore,t.query,!1).then(({documents:e})=>t.view.ha(e,i)));let s=n&&n.targetChanges.get(t.targetId),a=n&&null!=n.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return ie(e,t.targetId,o.da),o.snapshot})(e,t,r,n);let s=await rX(e.localStore,t,!0),a=new nG(t,s.hs),o=a.ha(s.documents),l=t9.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);ie(e,r,u.da);let h=new nW(t,r,a);return e.ga.set(t,h),e.pa.has(r)?e.pa.get(r).push(t):e.pa.set(r,[t]),u.snapshot}async function nZ(e,t){let r=e.ga.get(t),n=e.pa.get(r.targetId);if(n.length>1)return e.pa.set(r.targetId,n.filter(e=>!ta(e,t))),void e.ga.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(r.targetId),e.sharedClientState.isActiveQueryTarget(r.targetId)||await rY(e.localStore,r.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(r.targetId),nh(e.remoteStore,r.targetId),n6(e,r.targetId)}).catch(Q)):(n6(e,r.targetId),await rY(e.localStore,r.targetId,!0))}async function n0(e,t,r){var n;let i=(e.remoteStore.remoteSyncer.applySuccessfulWrite=n3.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=n9.bind(null,e),e);try{let e;let s=await function(e,t){let r,n;let i=O.now(),s=t.reduce((e,t)=>e.add(t.key),tv());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=td,l=tv();return e.os.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(n=>{r=n;let s=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),i=tS(n.transform,e||null);null!=i&&(null===r&&(r=eU.empty()),r.set(n.field,i))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&s.push(new t$(e.key,t,function e(t){let r=[];return es(t.fields,(t,n)=>{let i=new q([t]);if(eM(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(i);else for(let e of t)r.push(i.child(e))}else r.push(i)}),new ed(r)}(t.value.mapValue),tO.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{n=t;let i=t.applyToLocalDocumentSet(r,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:n.batchId,changes:tp(r)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),n=s.batchId,(e=i.Da[i.currentUser.toKey()])||(e=new eo(L)),e=e.insert(n,r),i.Da[i.currentUser.toKey()]=e,await ir(i,s.changes),await nE(i.remoteStore)}catch(t){let e=nL(t,"Failed to persist write");r.reject(e)}}async function n1(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.ns;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{var s;let a,o;let l=e.os.newChangeBuffer({trackRemovals:!0});n=e.ns;let u=[];t.targetChanges.forEach((s,a)=>{var o;let l=n.get(a);if(!l)return;u.push(e.Qr.removeMatchingKeys(i,s.removedDocuments,a).next(()=>e.Qr.addMatchingKeys(i,s.addedDocuments,a)));let h=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(a)?h=h.withResumeToken(em.EMPTY_BYTE_STRING,M.min()).withLastLimboFreeSnapshotVersion(M.min()):s.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(s.resumeToken,r)),n=n.insert(a,h),o=h,(0===l.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&u.push(e.Qr.updateTargetData(i,h))});let h=td,c=tv();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,r))}),u.push((s=t.documentUpdates,a=tv(),o=tv(),s.forEach(e=>a=a.add(e)),l.getEntries(i,a).next(e=>{let t=td;return s.forEach((r,n)=>{let i=e.get(r);n.isFoundDocument()!==i.isFoundDocument()&&(o=o.add(r)),n.isNoDocument()&&n.version.isEqual(M.min())?(l.removeEntry(r,n.readTime),t=t.insert(r,n)):!i.isValidDocument()||n.version.compareTo(i.version)>0||0===n.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(n),t=t.insert(r,n)):g("LocalStore","Ignoring outdated watch update for ",r,". Current version:",i.version," Watch version:",n.version)}),{cs:t,ls:o}})).next(e=>{h=e.cs,c=e.ls})),!r.isEqual(M.min())){let t=e.Qr.getLastRemoteSnapshotVersion(i).next(t=>e.Qr.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(t)}return j.waitFor(u).next(()=>l.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,h,c)).next(()=>h)}).then(t=>(e.ns=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.Sa.get(r);n&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||_(),t.addedDocuments.size>0?n.ma=!0:t.modifiedDocuments.size>0?n.ma||_():t.removedDocuments.size>0&&(n.ma||_(),n.ma=!1))}),await ir(e,r,t)}catch(e){await Q(e)}}function n2(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let i=[];e.ga.forEach((e,r)=>{let n=r.view.U_(t);n.snapshot&&i.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.Q_)e.U_(t)&&(r=!0)}),r&&nz(n),i.length&&e.fa.u_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function n4(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.Sa.get(t),i=n&&n.key;if(i){let r=new eo(B.comparator);r=r.insert(i,eq.newNoDocument(i,M.min()));let n=tv().add(i),s=new t3(M.min(),new Map,new eo(L),r,n);await n1(e,s),e.wa=e.wa.remove(i),e.Sa.delete(t),it(e)}else await rY(e.localStore,t,!1).then(()=>n6(e,t,r)).catch(Q)}async function n3(e,t){var r;let n=t.batch.batchId;try{let i=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.os.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let i=r.batch,s=i.keys(),a=j.resolve();return s.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let s=r.docVersions.get(e);null!==s||_(),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tv();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});n5(e,n,null),n8(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await ir(e,i)}catch(e){await Q(e)}}async function n9(e,t,r){var n;try{let i=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||_(),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});n5(e,t,r),n8(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await ir(e,i)}catch(e){await Q(e)}}function n8(e,t){(e.Ca.get(t)||[]).forEach(e=>{e.resolve()}),e.Ca.delete(t)}function n5(e,t,r){let n=e.Da[e.currentUser.toKey()];if(n){let i=n.get(t);i&&(r?i.reject(r):i.resolve(),n=n.remove(t)),e.Da[e.currentUser.toKey()]=n}}function n6(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.pa.get(t)))e.ga.delete(n),r&&e.fa.xa(n,r);e.pa.delete(t),e.isPrimaryClient&&e.ba.Vr(t).forEach(t=>{e.ba.containsKey(t)||n7(e,t)})}function n7(e,t){e.ya.delete(t.path.canonicalString());let r=e.wa.get(t);null!==r&&(nh(e.remoteStore,r),e.wa=e.wa.remove(t),e.Sa.delete(r),it(e))}function ie(e,t,r){for(let n of r)n instanceof nQ?(e.ba.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.wa.get(r)||e.ya.has(n)||(g("SyncEngine","New document in limbo: "+r),e.ya.add(n),it(e))}(e,n)):n instanceof nj?(g("SyncEngine","Document no longer in limbo: "+n.key),e.ba.removeReference(n.key,t),e.ba.containsKey(n.key)||n7(e,n.key)):_()}function it(e){for(;e.ya.size>0&&e.wa.size<e.maxConcurrentLimboResolutions;){let t=e.ya.values().next().value;e.ya.delete(t);let r=new B(P.fromString(t)),n=e.va.next();e.Sa.set(n,new nH(r)),e.wa=e.wa.insert(r,n),nu(e.remoteStore,new rI(tn(new e7(r.path)),n,"TargetPurposeLimboResolution",er._e))}}async function ir(e,t,r){let n=[],i=[],s=[];e.ga.isEmpty()||(e.ga.forEach((a,o)=>{s.push(e.Ma(o,t,r).then(t=>{if((t||r)&&e.isPrimaryClient&&e.sharedClientState.updateQueryState(o.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){n.push(t);let e=rK.Ki(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.fa.u_(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>j.forEach(t,t=>j.forEach(t.qi,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>j.forEach(t.Qi,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!X(e))throw e;g("LocalStore","Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.ns.get(t),n=r.snapshotVersion,i=r.withLastLimboFreeSnapshotVersion(n);e.ns=e.ns.insert(t,i)}}}(e.localStore,i))}async function ii(e,t){if(!e.currentUser.isEqual(t)){g("SyncEngine","User change. New user:",t.toKey());let r=await rW(e.localStore,t);e.currentUser=t,e.Ca.forEach(e=>{e.forEach(e=>{e.reject(new T(E.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.Ca.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await ir(e,r.us)}}function is(e,t){let r=e.Sa.get(t);if(r&&r.ma)return tv().add(r.key);{let r=tv(),n=e.pa.get(t);if(!n)return r;for(let t of n){let n=e.ga.get(t);r=r.unionWith(n.view.la)}return r}}class ia{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=r7(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){var t;return t=this.persistence,new rG(t,new rj,e.initialUser,this.serializer)}createPersistence(e){return new rB(rz.Hr,this.serializer)}createSharedClientState(e){return new rZ}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class io{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>n2(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=ii.bind(null,this.syncEngine),await nN(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new nP}createDatastore(e){let t=r7(e.databaseInfo.databaseId),r=new r5(e.databaseInfo);return new ni(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new na(t,this.datastore,e.asyncQueue,e=>n2(this.syncEngine,e,0),r1.D()?new r1:new r0)}createSyncEngine(e,t){return function(e,t,r,n,i,s,a){let o=new nY(e,t,r,n,i,s);return a&&(o.Fa=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(e){g("RemoteStore","RemoteStore shutting down."),e.v_.add(5),await nl(e),e.M_.shutdown(),e.x_.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Ba(this.observer.next,e)}error(e){this.observer.error?this.Ba(this.observer.error,e):y("Uncaught Error in snapshot listener:",e.toString())}La(){this.muted=!0}Ba(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,t,r,n){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=d.UNAUTHENTICATED,this.clientId=R.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async e=>{g("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(g("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new I;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=nL(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function ih(e,t){e.asyncQueue.verifyOperationInProgress(),g("FirestoreClient","Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await rW(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function ic(e,t){e.asyncQueue.verifyOperationInProgress();let r=await id(e);g("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>nD(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>nD(t.remoteStore,r)),e._onlineComponents=t}async function id(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){g("FirestoreClient","Using user provided OfflineComponentProvider");try{await ih(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===E.FAILED_PRECONDITION||t.code===E.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;w("Error using user provided cache. Falling back to memory cache: "+t),await ih(e,new ia)}}else g("FirestoreClient","Using default OfflineComponentProvider"),await ih(e,new ia)}return e._offlineComponents}async function im(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(g("FirestoreClient","Using user provided OnlineComponentProvider"),await ic(e,e._uninitializedComponentsProvider._online)):(g("FirestoreClient","Using default OnlineComponentProvider"),await ic(e,new io))),e._onlineComponents}async function ip(e){let t=await im(e),r=t.eventManager;return r.onListen=nX.bind(null,t.syncEngine),r.onUnlisten=nZ.bind(null,t.syncEngine),r}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iy=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iw(e,t,r){if(!r)throw new T(E.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function iv(e){if(!B.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function i_(e){if(B.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function iE(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":_()}function iT(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new T(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=iE(e);throw new T(E.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e){var t,r;if(void 0===e.host){if(void 0!==e.ssl)throw new T(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new T(E.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,r,n){if(!0===t&&!0===n)throw new T(E.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ig(null!==(r=e.experimentalLongPollingOptions)&&void 0!==r?r:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new T(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new T(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new T(E.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class iS{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new iI({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new T(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new T(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new iI(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new C;switch(e.type){case"firstParty":return new N(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new T(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=iy.get(e);t&&(g("ComponentProvider","Removing Datastore"),iy.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iC{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new iC(this.firestore,e,this._query)}}class iA{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ib(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new iA(this.firestore,e,this._key)}}class ib extends iC{constructor(e,t,r){super(e,t,new e7(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new iA(this.firestore,null,new B(e))}withConverter(e){return new ib(this.firestore,e,this._path)}}function iD(e,t,...r){if(e=(0,l.m9)(e),iw("collection","path",t),e instanceof iS){let n=P.fromString(t,...r);return i_(n),new ib(e,null,n)}{if(!(e instanceof iA||e instanceof ib))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(P.fromString(t,...r));return i_(n),new ib(e.firestore,null,n)}}function iN(e,t,...r){if(e=(0,l.m9)(e),1==arguments.length&&(t=R.newId()),iw("doc","path",t),e instanceof iS){let n=P.fromString(t,...r);return iv(n),new iA(e,null,new B(n))}{if(!(e instanceof iA||e instanceof ib))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(P.fromString(t,...r));return iv(n),new iA(e.firestore,e instanceof ib?e.converter:null,new B(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik{constructor(){this.Xa=Promise.resolve(),this.eu=[],this.tu=!1,this.nu=[],this.ru=null,this.iu=!1,this.su=!1,this.ou=[],this.jo=new ne(this,"async_queue_retry"),this._u=()=>{let e=r6();e&&g("AsyncQueue","Visibility state changed to "+e.visibilityState),this.jo.Ko()};let e=r6();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this._u)}get isShuttingDown(){return this.tu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.au(),this.uu(e)}enterRestrictedMode(e){if(!this.tu){this.tu=!0,this.su=e||!1;let t=r6();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._u)}}enqueue(e){if(this.au(),this.tu)return new Promise(()=>{});let t=new I;return this.uu(()=>this.tu&&this.su?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.eu.push(e),this.cu()))}async cu(){if(0!==this.eu.length){try{await this.eu[0](),this.eu.shift(),this.jo.reset()}catch(e){if(!X(e))throw e;g("AsyncQueue","Operation failed with retryable error: "+e)}this.eu.length>0&&this.jo.qo(()=>this.cu())}}uu(e){let t=this.Xa.then(()=>(this.iu=!0,e().catch(e=>{let t;throw this.ru=e,this.iu=!1,y("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this.iu=!1,e))));return this.Xa=t,t}enqueueAfterDelay(e,t,r){this.au(),this.ou.indexOf(e)>-1&&(t=0);let n=nR.createAndSchedule(this,e,t,r,e=>this.lu(e));return this.nu.push(n),n}au(){this.ru&&_()}verifyOperationInProgress(){}async hu(){let e;do e=this.Xa,await e;while(e!==this.Xa)}Pu(e){for(let t of this.nu)if(t.timerId===e)return!0;return!1}Iu(e){return this.hu().then(()=>{for(let t of(this.nu.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.nu))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.hu()})}Tu(e){this.ou.push(e)}lu(e){let t=this.nu.indexOf(e);this.nu.splice(t,1)}}class ix extends iS{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new ik,this._persistenceKey=(null==n?void 0:n.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||iV(this),this._firestoreClient.terminate()}}function iR(e,t){let r="object"==typeof e?e:(0,s.Mq)(),n=(0,s.qX)(r,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!n._initialized){let e=(0,l.P0)("firestore");e&&function(e,t,r,n={}){var i;let s=(e=iT(e,iS))._getSettings(),a=`${t}:${r}`;if("firestore.googleapis.com"!==s.host&&s.host!==a&&w("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),n.mockUserToken){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=d.MOCK_USER;else{t=(0,l.Sg)(n.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=n.mockUserToken.sub||n.mockUserToken.user_id;if(!s)throw new T(E.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new d(s)}e._authCredentials=new A(new S(t,r))}}(n,...e)}return n}function iL(e){return e._firestoreClient||iV(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function iV(e){var t,r,n,i;let s=e._freezeSettings(),a=(i=e._databaseId,new eT(i,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,ig(s.experimentalLongPollingOptions),s.useFetchStreams));e._firestoreClient=new iu(e._authCredentials,e._appCheckCredentials,e._queue,a),(null===(r=s.localCache)||void 0===r?void 0:r._offlineComponentProvider)&&(null===(n=s.localCache)||void 0===n?void 0:n._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.localCache.kind,_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iO{constructor(e){this._byteString=e}static fromBase64String(e){try{return new iO(em.fromBase64String(e))}catch(e){throw new T(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new iO(em.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iM{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new T(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new q(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iF{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iP{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new T(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new T(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return L(this._lat,e._lat)||L(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iU=/^__.*__$/;class iq{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new t$(e,this.data,this.fieldMask,t,this.fieldTransforms):new tB(e,this.data,t,this.fieldTransforms)}}function iB(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw _()}}class i${constructor(e,t,r,n,i,s){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this.Eu(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get du(){return this.settings.du}Au(e){return new i$(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ru(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.Au({path:r,Vu:!1});return n.mu(e),n}fu(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.Au({path:r,Vu:!1});return n.Eu(),n}gu(e){return this.Au({path:void 0,Vu:!0})}pu(e){return iJ(e,this.settings.methodName,this.settings.yu||!1,this.path,this.settings.wu)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Eu(){if(this.path)for(let e=0;e<this.path.length;e++)this.mu(this.path.get(e))}mu(e){if(0===e.length)throw this.pu("Document fields must not be empty");if(iB(this.du)&&iU.test(e))throw this.pu('Document fields cannot begin and end with "__"')}}class iz{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||r7(e)}Su(e,t,r,n=!1){return new i$({du:e,methodName:t,wu:r,path:q.emptyPath(),Vu:!1,yu:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function iK(e){let t=e._freezeSettings(),r=r7(e._databaseId);return new iz(e._databaseId,!!t.ignoreUndefinedProperties,r)}class iQ extends iF{_toFieldTransform(e){return new tL(e.path,new tC)}isEqual(e){return e instanceof iQ}}function ij(e,t){if(iW(e=(0,l.m9)(e)))return iH("Unsupported field value:",t,e),iG(e,t);if(e instanceof iF)return function(e,t){if(!iB(t.du))throw t.pu(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.pu(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.Vu&&4!==t.du)throw t.pu("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let i of e){let e=ij(i,t.gu(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){if(null===(e=(0,l.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e){var r,n,i;return r=t.serializer,"number"==typeof(i=n=e)&&Number.isInteger(i)&&!en(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?tT(n):tE(r,n)}if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=O.fromDate(e);return{timestampValue:rl(t.serializer,r)}}if(e instanceof O){let r=new O(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rl(t.serializer,r)}}if(e instanceof iP)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof iO)return{bytesValue:ru(t.serializer,e._byteString)};if(e instanceof iA){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.pu(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:rc(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.pu(`Unsupported field value: ${iE(e)}`)}(e,t)}function iG(e,t){let r={};return ea(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):es(e,(e,n)=>{let i=ij(n,t.Ru(e));null!=i&&(r[e]=i)}),{mapValue:{fields:r}}}function iW(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof O||e instanceof iP||e instanceof iO||e instanceof iA||e instanceof iF)}function iH(e,t,r){if(!iW(r)||!("object"==typeof r&&null!==r&&(Object.getPrototypeOf(r)===Object.prototype||null===Object.getPrototypeOf(r)))){let n=iE(r);throw"an object"===n?t.pu(e+" a custom object"):t.pu(e+" "+n)}}let iY=RegExp("[~\\*/\\[\\]]");function iX(e,t,r){if(t.search(iY)>=0)throw iJ(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new iM(...t.split("."))._internalPath}catch(n){throw iJ(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function iJ(e,t,r,n,i){let s=n&&!n.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${n}`),a&&(l+=` in document ${i}`),l+=")"),new T(E.INVALID_ARGUMENT,o+e+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iZ{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new iA(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new i0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(i1("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class i0 extends iZ{data(){return super.data()}}function i1(e,t){return"string"==typeof t?iX(e,t):t instanceof iM?t._internalPath:t._delegate._internalPath}class i2{}class i4 extends i2{}function i3(e,t,...r){let n=[];for(let i of(t instanceof i2&&n.push(t),function(e){let t=e.filter(e=>e instanceof i5).length,r=e.filter(e=>e instanceof i9).length;if(t>1||t>0&&r>0)throw new T(E.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n=n.concat(r)),n))e=i._apply(e);return e}class i9 extends i4{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new i9(e,t,r)}_apply(e){let t=this._parse(e);return se(e._query,t),new iC(e.firestore,e.converter,ti(e._query,t))}_parse(e){let t=iK(e.firestore);return function(e,t,r,n,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new T(E.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){i7(a,s);let t=[];for(let r of a)t.push(i6(n,e,r));o={arrayValue:{values:t}}}else o=i6(n,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||i7(a,s),o=function(e,t,r,n=!1){return ij(r,e.Su(n?4:3,t))}(r,t,a,"in"===s||"not-in"===s);return ej.create(i,s,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function i8(e,t,r){let n=i1("where",e);return i9._create(n,t,r)}class i5 extends i2{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new i5(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:eG.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let r=e;for(let e of t.getFlattenedFilters())se(r,e),r=ti(r,e)}(e._query,t),new iC(e.firestore,e.converter,ti(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function i6(e,t,r){if("string"==typeof(r=(0,l.m9)(r))){if(""===r)throw new T(E.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!tt(t)&&-1!==r.indexOf("/"))throw new T(E.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);let n=t.path.child(P.fromString(r));if(!B.isDocumentKey(n))throw new T(E.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return ex(e,new B(n))}if(r instanceof iA)return ex(e,r._key);throw new T(E.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${iE(r)}.`)}function i7(e,t){if(!Array.isArray(e)||0===e.length)throw new T(E.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function se(e,t){let r=function(e,t){for(let r of e)for(let e of r.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==r)throw r===t.op?new T(E.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new T(E.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}class st{convertValue(e,t="none"){switch(eC(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ey(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ew(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw _()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return es(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertGeoPoint(e){return new iP(ey(e.latitude),ey(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=e_(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(eE(e));default:return null}}convertTimestamp(e){let t=eg(e);return new O(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=P.fromString(e);rT(r)||_();let n=new eI(r.get(1),r.get(3)),i=new B(r.popFirst(5));return n.isEqual(t)||y(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sn extends iZ{constructor(e,t,r,n,i,s){super(e,t,r,n,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new si(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(i1("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class si extends sn{data(e={}){return super.data(e)}}class ss{constructor(e,t,r,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new sr(n.hasPendingWrites,n.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new si(this._firestore,this._userDataWriter,r.key,r,new sr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new T(E.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(r=>{let n=new si(e._firestore,e._userDataWriter,r.doc.key,r.doc,new sr(e._snapshot.mutatedKeys.has(r.doc.key),e._snapshot.fromCache),e.query.converter);return r.doc,{type:"added",doc:n,oldIndex:-1,newIndex:t++}})}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new si(e._firestore,e._userDataWriter,t.doc.key,t.doc,new sr(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(s=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return _()}}(t.type),doc:n,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(e){e=iT(e,iA);let t=iT(e.firestore,ix);return(function(e,t,r={}){let n=new I;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new il({next:s=>{t.enqueueAndForget(()=>nq(e,a));let o=s.docs.has(r);!o&&s.fromCache?i.reject(new T(E.UNAVAILABLE,"Failed to get document because the client is offline.")):o&&s.fromCache&&n&&"server"===n.source?i.reject(new T(E.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),a=new nK(new e7(r.path),s,{includeMetadataChanges:!0,Z_:!0});return nU(e,a)})(await ip(e),e.asyncQueue,t,r,n)),n.promise})(iL(t),e._key).then(r=>(function(e,t,r){let n=r.docs.get(t._key),i=new so(e);return new sn(e,i,t._key,n,new sr(r.hasPendingWrites,r.fromCache),t.converter)})(t,e,r))}class so extends st{constructor(e){super(),this.firestore=e}convertBytes(e){return new iO(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new iA(this.firestore,null,t)}}function sl(e){e=iT(e,iC);let t=iT(e.firestore,ix),r=iL(t),n=new so(t);return(/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new T(E.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query),(function(e,t,r={}){let n=new I;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new nK(r,new il({next:r=>{t.enqueueAndForget(()=>nq(e,s)),r.fromCache&&"server"===n.source?i.reject(new T(E.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(r)},error:e=>i.reject(e)}),{includeMetadataChanges:!0,Z_:!0});return nU(e,s)})(await ip(e),e.asyncQueue,t,r,n)),n.promise})(r,e._query).then(r=>new ss(t,n,e,r)))}function su(e,t,r){var n,i;e=iT(e,iA);let s=iT(e.firestore,ix),a=(n=e.converter)?r&&(r.merge||r.mergeFields)?n.toFirestore(t,r):n.toFirestore(t):t;return i=[(function(e,t,r,n,i,s={}){let a,o;let u=e.Su(s.merge||s.mergeFields?2:0,t,r,i);iH("Data must be an object, but it was:",u,n);let h=iG(n,u);if(s.merge)a=new ed(u.fieldMask),o=u.fieldTransforms;else if(s.mergeFields){let e=[];for(let n of s.mergeFields){let i=function(e,t,r){if((t=(0,l.m9)(t))instanceof iM)return t._internalPath;if("string"==typeof t)return iX(e,t);throw iJ("Field path arguments must be of type string or ",e,!1,void 0,r)}(t,n,r);if(!u.contains(i))throw new T(E.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);(function(e,t){return e.some(e=>e.isEqual(t))})(e,i)||e.push(i)}a=new ed(e),o=u.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=u.fieldTransforms;return new iq(new eU(h),a,o)})(iK(s),"setDoc",e._key,a,null!==e.converter,r).toMutation(e._key,tO.none())],function(e,t){let r=new I;return e.asyncQueue.enqueueAndForget(async()=>n0(await im(e).then(e=>e.syncEngine),t,r)),r.promise}(iL(s),i)}function sh(){return new iQ("serverTimestamp")}new WeakMap,function(e=!0){f=s.Jn,(0,s.Xd)(new a.wA("firestore",(t,{instanceIdentifier:r,options:n})=>{let i=t.getProvider("app").getImmediate(),s=new ix(new b(t.getProvider("auth-internal")),new x(t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new T(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eI(e.options.projectId,t)}(i,r),i);return n=Object.assign({useFetchStreams:e},n),s._setSettings(n),s},"PUBLIC").setMultipleInstances(!0)),(0,s.KN)(c,"4.4.3",void 0),(0,s.KN)(c,"4.4.3","esm2017")}()}}]);