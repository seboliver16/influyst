"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[358],{9009:function(e,t,r){r.d(t,{Bt:function(){return sT},IO:function(){return si},JU:function(){return iO},PL:function(){return sw},QT:function(){return sg},ad:function(){return iF},ar:function(){return sa},hJ:function(){return iV},pl:function(){return sv},r7:function(){return s_}});var n,i,s,a,o=r(5723),l=r(6574),u=r(9858),h=r(8954),c=r(1197),d=r(9079);let f="@firebase/firestore";/**
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
 */class m{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}m.UNAUTHENTICATED=new m(null),m.GOOGLE_CREDENTIALS=new m("google-credentials-uid"),m.FIRST_PARTY=new m("first-party-uid"),m.MOCK_USER=new m("mock-user");/**
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
 */let p="10.10.0",g=new u.Yd("@firebase/firestore");function y(){return g.logLevel}function w(e,...t){if(g.logLevel<=u.in.DEBUG){let r=t.map(E);g.debug(`Firestore (${p}): ${e}`,...r)}}function v(e,...t){if(g.logLevel<=u.in.ERROR){let r=t.map(E);g.error(`Firestore (${p}): ${e}`,...r)}}function _(e,...t){if(g.logLevel<=u.in.WARN){let r=t.map(E);g.warn(`Firestore (${p}): ${e}`,...r)}}function E(e){if("string"==typeof e)return e;try{/**
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
 */function T(e="Unexpected state"){let t=`FIRESTORE (${p}) INTERNAL ASSERTION FAILED: `+e;throw v(t),Error(t)}/**
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
 */let I={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class S extends h.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class C{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class b{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class D{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(m.UNAUTHENTICATED))}shutdown(){}}class A{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class N{constructor(e){this.t=e,this.currentUser=m.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i,n=e=>this.i!==r?(r=this.i,t(e)):Promise.resolve(),i=new C;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new C,e.enqueueRetryable(()=>n(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},a=e=>{w("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(w("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new C)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(w("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||T(),new b(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||T(),new m(e)}}class k{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=m.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class x{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new k(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(m.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class R{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class L{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){let r=e=>{null!=e.error&&w("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let r=e.token!==this.R;return this.R=e.token,w("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>r(t))};let n=e=>{w("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.A.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){let e=this.A.getImmediate({optional:!0});e?n(e):w("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||T(),this.R=e.token,new R(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */class V{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,r="";for(;r.length<20;){let n=/**
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
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),r=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(r);else for(let t=0;t<e;t++)r[t]=Math.floor(256*Math.random());return r}(40);for(let i=0;i<n.length;++i)r.length<20&&n[i]<t&&(r+=e.charAt(n[i]%e.length))}return r}}function O(e,t){return e<t?-1:e>t?1:0}function M(e,t,r){return e.length===t.length&&e.every((e,n)=>r(e,t[n]))}/**
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
 */class P{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new S(I.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new S(I.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return P.fromMillis(Date.now())}static fromDate(e){return P.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new P(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?O(this.nanoseconds,e.nanoseconds):O(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class F{constructor(e){this.timestamp=e}static fromTimestamp(e){return new F(e)}static min(){return new F(new P(0,0))}static max(){return new F(new P(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class U{constructor(e,t,r){void 0===t?t=0:t>e.length&&T(),void 0===r?r=e.length-t:r>e.length-t&&T(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return 0===U.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof U?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++){let r=e.get(n),i=t.get(n);if(r<i)return -1;if(r>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class q extends U{construct(e,t,r){return new q(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new S(I.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(e=>e.length>0))}return new q(t)}static emptyPath(){return new q([])}}let B=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class $ extends U{construct(e,t,r){return new $(e,t,r)}static isValidIdentifier(e){return B.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),$.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new $(["__name__"])}static fromServerFormat(e){let t=[],r="",n=0,i=()=>{if(0===r.length)throw new S(I.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},s=!1;for(;n<e.length;){let t=e[n];if("\\"===t){if(n+1===e.length)throw new S(I.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[n+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new S(I.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=t,n+=2}else"`"===t?s=!s:"."!==t||s?r+=t:i(),n++}if(i(),s)throw new S(I.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new $(t)}static emptyPath(){return new $([])}}/**
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
 */class z{constructor(e){this.path=e}static fromPath(e){return new z(q.fromString(e))}static fromName(e){return new z(q.fromString(e).popFirst(5))}static empty(){return new z(q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===q.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new z(new q(e.slice()))}}/**
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
 */class K{constructor(e,t,r,n){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=n}}K.UNKNOWN_ID=-1;class Q{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Q(F.min(),z.empty(),-1)}static max(){return new Q(F.max(),z.empty(),-1)}}class G{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function j(e){if(e.code!==I.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;w("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&T(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new W((r,n)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(r,n)},this.catchCallback=e=>{this.wrapFailure(t,e).next(r,n)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof W?t:W.resolve(t)}catch(e){return W.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):W.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):W.reject(t)}static resolve(e){return new W((t,r)=>{t(e)})}static reject(e){return new W((t,r)=>{r(e)})}static waitFor(e){return new W((t,r)=>{let n=0,i=0,s=!1;e.forEach(e=>{++n,e.next(()=>{++i,s&&i===n&&t()},e=>r(e))}),s=!0,i===n&&t()})}static or(e){let t=W.resolve(!1);for(let r of e)t=t.next(e=>e?W.resolve(e):r());return t}static forEach(e,t){let r=[];return e.forEach((e,n)=>{r.push(t.call(this,e,n))}),this.waitFor(r)}static mapArray(e,t){return new W((r,n)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let l=o;t(e[l]).next(e=>{s[l]=e,++a===i&&r(s)},e=>n(e))}})}static doWhile(e,t){return new W((r,n)=>{let i=()=>{!0===e()?t().next(()=>{i()},n):r()};i()})}}/**
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
 */class H{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new C,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new X(e,t.error)):this.V.resolve()},this.transaction.onerror=t=>{let r=en(t.target.error);this.V.reject(new X(e,r))}}static open(e,t,r,n){try{return new H(t,e.transaction(n,r))}catch(e){throw new X(t,e)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(w("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){return new ee(this.transaction.objectStore(e))}}class Y{constructor(e,t,r){this.name=e,this.version=t,this.p=r,12.2===Y.S((0,h.z$)())&&v("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return w("SimpleDb","Removing database:",e),et(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!(0,h.hl)())return!1;if(Y.C())return!0;let e=(0,h.z$)(),t=Y.S(e),r=Y.v(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<r&&r<4.5)}static C(){var e;return void 0!==d&&"YES"===(null===(e=d.__PRIVATE_env)||void 0===e?void 0:e.F)}static M(e,t){return e.store(t)}static S(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i);return Number(t?t[1].split("_").slice(0,2).join("."):"-1")}static v(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}async O(e){return this.db||(w("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{let n=indexedDB.open(this.name,this.version);n.onsuccess=e=>{t(e.target.result)},n.onblocked=()=>{r(new X(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},n.onerror=t=>{let n=t.target.error;"VersionError"===n.name?r(new S(I.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===n.name?r(new S(I.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+n)):r(new X(e,n))},n.onupgradeneeded=e=>{w("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.p.N(t,n.transaction,e.oldVersion,this.version).next(()=>{w("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.L&&(this.db.onversionchange=e=>this.L(e)),this.db}B(e){this.L=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,n){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.O(e);let t=H.open(this.db,e,i?"readonly":"readwrite",r),s=n(t).next(e=>(t.g(),e)).catch(e=>(t.abort(e),W.reject(e))).toPromise();return s.catch(()=>{}),await t.m,s}catch(t){let e="FirebaseError"!==t.name&&s<3;if(w("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class J{constructor(e){this.k=e,this.q=!1,this.K=null}get isDone(){return this.q}get $(){return this.K}set cursor(e){this.k=e}done(){this.q=!0}U(e){this.K=e}delete(){return et(this.k.delete())}}class X extends S{constructor(e,t){super(I.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Z(e){return"IndexedDbTransactionError"===e.name}class ee{constructor(e){this.store=e}put(e,t){let r;return void 0!==t?(w("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(w("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),et(r)}add(e){return w("SimpleDb","ADD",this.store.name,e,e),et(this.store.add(e))}get(e){return et(this.store.get(e)).next(t=>(void 0===t&&(t=null),w("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return w("SimpleDb","DELETE",this.store.name,e),et(this.store.delete(e))}count(){return w("SimpleDb","COUNT",this.store.name),et(this.store.count())}W(e,t){let r=this.options(e,t),n=r.index?this.store.index(r.index):this.store;if("function"==typeof n.getAll){let e=n.getAll(r.range);return new W((t,r)=>{e.onerror=e=>{r(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{let e=this.cursor(r),t=[];return this.G(e,(e,r)=>{t.push(r)}).next(()=>t)}}j(e,t){let r=this.store.getAll(e,null===t?void 0:t);return new W((e,t)=>{r.onerror=e=>{t(e.target.error)},r.onsuccess=t=>{e(t.target.result)}})}H(e,t){w("SimpleDb","DELETE ALL",this.store.name);let r=this.options(e,t);r.J=!1;let n=this.cursor(r);return this.G(n,(e,t,r)=>r.delete())}Y(e,t){let r;t?r=e:(r={},t=e);let n=this.cursor(r);return this.G(n,t)}Z(e){let t=this.cursor({});return new W((r,n)=>{t.onerror=e=>{n(en(e.target.error))},t.onsuccess=t=>{let n=t.target.result;n?e(n.primaryKey,n.value).next(e=>{e?n.continue():r()}):r()}})}G(e,t){let r=[];return new W((n,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void n();let s=new J(i),a=t(i.primaryKey,i.value,s);if(a instanceof W){let e=a.catch(e=>(s.done(),W.reject(e)));r.push(e)}s.isDone?n():null===s.$?i.continue():i.continue(s.$)}}).next(()=>W.waitFor(r))}options(e,t){let r;return void 0!==e&&("string"==typeof e?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let r=this.store.index(e.index);return e.J?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function et(e){return new W((t,r)=>{e.onsuccess=e=>{t(e.target.result)},e.onerror=e=>{r(en(e.target.error))}})}let er=!1;function en(e){let t=Y.S((0,h.z$)());if(t>=12.2&&t<13){let t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){let e=new S("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return er||(er=!0,setTimeout(()=>{throw e},0)),e}}return e}/**
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
 */class ei{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.se(e),this.oe=e=>t.writeSequenceNumber(e))}se(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.oe&&this.oe(e),e}}function es(e){return 0===e&&1/e==-1/0}/**
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
 */function ea(e){let t=0;for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t++;return t}function eo(e,t){for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&t(r,e[r])}function el(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}ei._e=-1;/**
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
 */class eu{constructor(e,t){this.comparator=e,this.root=t||ec.EMPTY}insert(e,t){return new eu(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ec.BLACK,null,null))}remove(e){return new eu(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ec.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(0===r)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let n=this.comparator(e,r.key);if(0===n)return t+r.left.size;n<0?r=r.left:(t+=r.left.size+1,r=r.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eh(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eh(this.root,e,this.comparator,!1)}getReverseIterator(){return new eh(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eh(this.root,e,this.comparator,!0)}}class eh{constructor(e,t,r,n){this.isReverse=n,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&n&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ec{constructor(e,t,r,n,i){this.key=e,this.value=t,this.color=null!=r?r:ec.RED,this.left=null!=n?n:ec.EMPTY,this.right=null!=i?i:ec.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,n,i){return new ec(null!=e?e:this.key,null!=t?t:this.value,null!=r?r:this.color,null!=n?n:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let n=this,i=r(e,n.key);return(n=i<0?n.copy(null,null,null,n.left.insert(e,t,r),null):0===i?n.copy(null,t,null,null,null):n.copy(null,null,null,null,n.right.insert(e,t,r))).fixUp()}removeMin(){if(this.left.isEmpty())return ec.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let r,n=this;if(0>t(e,n.key))n.left.isEmpty()||n.left.isRed()||n.left.left.isRed()||(n=n.moveRedLeft()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed()&&(n=n.rotateRight()),n.right.isEmpty()||n.right.isRed()||n.right.left.isRed()||(n=n.moveRedRight()),0===t(e,n.key)){if(n.right.isEmpty())return ec.EMPTY;r=n.right.min(),n=n.copy(r.key,r.value,null,null,n.right.removeMin())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,ec.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,ec.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw T();let e=this.left.check();if(e!==this.right.check())throw T();return e+(this.isRed()?0:1)}}ec.EMPTY=null,ec.RED=!0,ec.BLACK=!1,ec.EMPTY=new class{constructor(){this.size=0}get key(){throw T()}get value(){throw T()}get color(){throw T()}get left(){throw T()}get right(){throw T()}copy(e,t,r,n,i){return this}insert(e,t,r){return new ec(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ed{constructor(e){this.comparator=e,this.data=new eu(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let n=r.getNext();if(this.comparator(n.key,e[1])>=0)return;t(n.key)}}forEachWhile(e,t){let r;for(r=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ef(this.data.getIterator())}getIteratorFrom(e){return new ef(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof ed)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(0!==this.comparator(e,n))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new ed(this.comparator);return t.data=e,t}}class ef{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class em{constructor(e){this.fields=e,e.sort($.comparator)}static empty(){return new em([])}unionWith(e){let t=new ed($.comparator);for(let e of this.fields)t=t.add(e);for(let r of e)t=t.add(r);return new em(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return M(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
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
 */class ep extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class eg{constructor(e){this.binaryString=e}static fromBase64String(e){return new eg(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new ep("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new eg(function(e){let t="";for(let r=0;r<e.length;++r)t+=String.fromCharCode(e[r]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return O(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}eg.EMPTY_BYTE_STRING=new eg("");let ey=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ew(e){if(e||T(),"string"==typeof e){let t=0,r=ey.exec(e);if(r||T(),r[1]){let e=r[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:ev(e.seconds),nanos:ev(e.nanos)}}function ev(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function e_(e){return"string"==typeof e?eg.fromBase64String(e):eg.fromUint8Array(e)}/**
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
 */function eE(e){var t,r;return"server_timestamp"===(null===(r=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===r?void 0:r.stringValue)}function eT(e){let t=e.mapValue.fields.__previous_value__;return eE(t)?eT(t):t}function eI(e){let t=ew(e.mapValue.fields.__local_write_time__.timestampValue);return new P(t.seconds,t.nanos)}/**
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
 */class eS{constructor(e,t,r,n,i,s,a,o,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=n,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l}}class eC{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new eC("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof eC&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */let eb={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function eD(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?eE(e)?4:eq(e)?9007199254740991:10:T()}function eA(e,t){if(e===t)return!0;let r=eD(e);if(r!==eD(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eI(e).isEqual(eI(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let r=ew(e.timestampValue),n=ew(t.timestampValue);return r.seconds===n.seconds&&r.nanos===n.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return e_(e.bytesValue).isEqual(e_(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return ev(e.geoPointValue.latitude)===ev(t.geoPointValue.latitude)&&ev(e.geoPointValue.longitude)===ev(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return ev(e.integerValue)===ev(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let r=ev(e.doubleValue),n=ev(t.doubleValue);return r===n?es(r)===es(n):isNaN(r)&&isNaN(n)}return!1}(e,t);case 9:return M(e.arrayValue.values||[],t.arrayValue.values||[],eA);case 10:return function(e,t){let r=e.mapValue.fields||{},n=t.mapValue.fields||{};if(ea(r)!==ea(n))return!1;for(let e in r)if(r.hasOwnProperty(e)&&(void 0===n[e]||!eA(r[e],n[e])))return!1;return!0}(e,t);default:return T()}}function eN(e,t){return void 0!==(e.values||[]).find(e=>eA(e,t))}function ek(e,t){if(e===t)return 0;let r=eD(e),n=eD(t);if(r!==n)return O(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return O(e.booleanValue,t.booleanValue);case 2:return function(e,t){let r=ev(e.integerValue||e.doubleValue),n=ev(t.integerValue||t.doubleValue);return r<n?-1:r>n?1:r===n?0:isNaN(r)?isNaN(n)?0:-1:1}(e,t);case 3:return ex(e.timestampValue,t.timestampValue);case 4:return ex(eI(e),eI(t));case 5:return O(e.stringValue,t.stringValue);case 6:return function(e,t){let r=e_(e),n=e_(t);return r.compareTo(n)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let r=e.split("/"),n=t.split("/");for(let e=0;e<r.length&&e<n.length;e++){let t=O(r[e],n[e]);if(0!==t)return t}return O(r.length,n.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let r=O(ev(e.latitude),ev(t.latitude));return 0!==r?r:O(ev(e.longitude),ev(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let r=e.values||[],n=t.values||[];for(let e=0;e<r.length&&e<n.length;++e){let t=ek(r[e],n[e]);if(t)return t}return O(r.length,n.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===eb.mapValue&&t===eb.mapValue)return 0;if(e===eb.mapValue)return 1;if(t===eb.mapValue)return -1;let r=e.fields||{},n=Object.keys(r),i=t.fields||{},s=Object.keys(i);n.sort(),s.sort();for(let e=0;e<n.length&&e<s.length;++e){let t=O(n[e],s[e]);if(0!==t)return t;let a=ek(r[n[e]],i[s[e]]);if(0!==a)return a}return O(n.length,s.length)}(e.mapValue,t.mapValue);default:throw T()}}function ex(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return O(e,t);let r=ew(e),n=ew(t),i=O(r.seconds,n.seconds);return 0!==i?i:O(r.nanos,n.nanos)}function eR(e){var t,r;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=ew(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?e_(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,z.fromName(t).toString()):"geoPointValue"in e?(r=e.geoPointValue,`geo(${r.latitude},${r.longitude})`):"arrayValue"in e?function(e){let t="[",r=!0;for(let n of e.values||[])r?r=!1:t+=",",t+=eR(n);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),r="{",n=!0;for(let i of t)n?n=!1:r+=",",r+=`${i}:${eR(e.fields[i])}`;return r+"}"}(e.mapValue):T()}function eL(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function eV(e){return!!e&&"integerValue"in e}function eO(e){return!!e&&"arrayValue"in e}function eM(e){return!!e&&"nullValue"in e}function eP(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function eF(e){return!!e&&"mapValue"in e}function eU(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return eo(e.mapValue.fields,(e,r)=>t.mapValue.fields[e]=eU(r)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let r=0;r<(e.arrayValue.values||[]).length;++r)t.arrayValue.values[r]=eU(e.arrayValue.values[r]);return t}return Object.assign({},e)}function eq(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
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
 */class eB{constructor(e){this.value=e}static empty(){return new eB({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(!eF(t=(t.mapValue.fields||{})[e.get(r)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=eU(t)}setAll(e){let t=$.emptyPath(),r={},n=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,r,n),r={},n=[],t=i.popLast()}e?r[i.lastSegment()]=eU(e):n.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,n)}delete(e){let t=this.field(e.popLast());eF(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return eA(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let n=t.mapValue.fields[e.get(r)];eF(n)&&n.mapValue.fields||(n={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=n),t=n}return t.mapValue.fields}applyChanges(e,t,r){for(let n of(eo(t,(t,r)=>e[t]=r),r))delete e[n]}clone(){return new eB(eU(this.value))}}/**
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
 */class e${constructor(e,t,r,n,i,s,a){this.key=e,this.documentType=t,this.version=r,this.readTime=n,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new e$(e,0,F.min(),F.min(),F.min(),eB.empty(),0)}static newFoundDocument(e,t,r,n){return new e$(e,1,t,F.min(),r,n,0)}static newNoDocument(e,t){return new e$(e,2,t,F.min(),F.min(),eB.empty(),0)}static newUnknownDocument(e,t){return new e$(e,3,t,F.min(),F.min(),eB.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(F.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=eB.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=eB.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof e$&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new e$(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ez{constructor(e,t){this.position=e,this.inclusive=t}}function eK(e,t,r){let n=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(n=s.field.isKeyField()?z.comparator(z.fromName(a.referenceValue),r.key):ek(a,r.data.field(s.field)),"desc"===s.dir&&(n*=-1),0!==n)break}return n}function eQ(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let r=0;r<e.position.length;r++)if(!eA(e.position[r],t.position[r]))return!1;return!0}/**
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
 */class eG{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
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
 */class ej{}class eW extends ej{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,r):new eX(e,t,r):"array-contains"===t?new e2(e,r):"in"===t?new e4(e,r):"not-in"===t?new e9(e,r):"array-contains-any"===t?new e3(e,r):new eW(e,t,r)}static createKeyFieldInFilter(e,t,r){return"in"===t?new eZ(e,r):new e0(e,r)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(ek(t,this.value)):null!==t&&eD(this.value)===eD(t)&&this.matchesComparison(ek(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return T()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class eH extends ej{constructor(e,t){super(),this.filters=e,this.op=t,this.ue=null}static create(e,t){return new eH(e,t)}matches(e){return eY(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ue||(this.ue=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ue}getFilters(){return Object.assign([],this.filters)}}function eY(e){return"and"===e.op}function eJ(e){for(let t of e.filters)if(t instanceof eH)return!1;return!0}class eX extends eW{constructor(e,t,r){super(e,t,r),this.key=z.fromName(r.referenceValue)}matches(e){let t=z.comparator(e.key,this.key);return this.matchesComparison(t)}}class eZ extends eW{constructor(e,t){super(e,"in",t),this.keys=e1("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class e0 extends eW{constructor(e,t){super(e,"not-in",t),this.keys=e1("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function e1(e,t){var r;return((null===(r=t.arrayValue)||void 0===r?void 0:r.values)||[]).map(e=>z.fromName(e.referenceValue))}class e2 extends eW{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return eO(t)&&eN(t.arrayValue,this.value)}}class e4 extends eW{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eN(this.value.arrayValue,t)}}class e9 extends eW{constructor(e,t){super(e,"not-in",t)}matches(e){if(eN(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!eN(this.value.arrayValue,t)}}class e3 extends eW{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!eO(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eN(this.value.arrayValue,e))}}/**
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
 */class e8{constructor(e,t=null,r=[],n=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=n,this.limit=i,this.startAt=s,this.endAt=a,this.ce=null}}function e5(e,t=null,r=[],n=[],i=null,s=null,a=null){return new e8(e,t,r,n,i,s,a)}function e6(e){if(null===e.ce){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof eW)return t.field.canonicalString()+t.op.toString()+eR(t.value);if(eJ(t)&&eY(t))return t.filters.map(t=>e(t)).join(",");{let r=t.filters.map(t=>e(t)).join(",");return`${t.op}(${r})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==e.limit||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>eR(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>eR(e)).join(",")),e.ce=t}return e.ce}function e7(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var r,n;if(r=e.orderBy[i],n=t.orderBy[i],!(r.dir===n.dir&&r.field.isEqual(n.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let r=0;r<e.filters.length;r++)if(!function e(t,r){return t instanceof eW?r instanceof eW&&t.op===r.op&&t.field.isEqual(r.field)&&eA(t.value,r.value):t instanceof eH?r instanceof eH&&t.op===r.op&&t.filters.length===r.filters.length&&t.filters.reduce((t,n,i)=>t&&e(n,r.filters[i]),!0):void T()}(e.filters[r],t.filters[r]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eQ(e.startAt,t.startAt)&&eQ(e.endAt,t.endAt)}function te(e){return z.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
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
 */class tt{constructor(e,t=null,r=[],n=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=n,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.le=null,this.he=null,this.Pe=null,this.startAt,this.endAt}}function tr(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function tn(e){return null!==e.collectionGroup}function ti(e){if(null===e.le){let t;e.le=[];let r=new Set;for(let t of e.explicitOrderBy)e.le.push(t),r.add(t.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new ed($.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{r.has(t.canonicalString())||t.isKeyField()||e.le.push(new eG(t,n))}),r.has($.keyField().canonicalString())||e.le.push(new eG($.keyField(),n))}return e.le}function ts(e){return e.he||(e.he=function(e,t){if("F"===e.limitType)return e5(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new eG(e.field,t)});let r=e.endAt?new ez(e.endAt.position,e.endAt.inclusive):null,n=e.startAt?new ez(e.startAt.position,e.startAt.inclusive):null;return e5(e.path,e.collectionGroup,t,e.filters,e.limit,r,n)}}(e,ti(e))),e.he}function ta(e,t){let r=e.filters.concat([t]);return new tt(e.path,e.collectionGroup,e.explicitOrderBy.slice(),r,e.limit,e.limitType,e.startAt,e.endAt)}function to(e,t,r){return new tt(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,r,e.startAt,e.endAt)}function tl(e,t){return e7(ts(e),ts(t))&&e.limitType===t.limitType}function tu(e){return`${e6(ts(e))}|lt:${e.limitType}`}function th(e){var t;let r;return`Query(target=${r=(t=ts(e)).path.canonicalString(),null!==t.collectionGroup&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof eW?`${t.field.canonicalString()} ${t.op} ${eR(t.value)}`:t instanceof eH?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(r+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>eR(e)).join(",")),t.endAt&&(r+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>eR(e)).join(",")),`Target(${r})`}; limitType=${e.limitType})`}function tc(e,t){return t.isFoundDocument()&&function(e,t){let r=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(r):z.isDocumentKey(e.path)?e.path.isEqual(r):e.path.isImmediateParentOf(r)}(e,t)&&function(e,t){for(let r of ti(e))if(!r.field.isKeyField()&&null===t.data.field(r.field))return!1;return!0}(e,t)&&function(e,t){for(let r of e.filters)if(!r.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,r){let n=eK(e,t,r);return e.inclusive?n<=0:n<0}(e.startAt,ti(e),t))&&(!e.endAt||!!function(e,t,r){let n=eK(e,t,r);return e.inclusive?n>=0:n>0}(e.endAt,ti(e),t))}function td(e){return(t,r)=>{let n=!1;for(let i of ti(e)){let e=function(e,t,r){let n=e.field.isKeyField()?z.comparator(t.key,r.key):function(e,t,r){let n=t.data.field(e),i=r.data.field(e);return null!==n&&null!==i?ek(n,i):T()}(e.field,t,r);switch(e.dir){case"asc":return n;case"desc":return -1*n;default:return T()}}(i,t,r);if(0!==e)return e;n=n||i.field.isKeyField()}return 0}}/**
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
 */class tf{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0!==r){for(let[t,n]of r)if(this.equalsFn(t,e))return n}}has(e){return void 0!==this.get(e)}set(e,t){let r=this.mapKeyFn(e),n=this.inner[r];if(void 0===n)return this.inner[r]=[[e,t]],void this.innerSize++;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return void(n[r]=[e,t]);n.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(void 0===r)return!1;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return 1===r.length?delete this.inner[t]:r.splice(n,1),this.innerSize--,!0;return!1}forEach(e){eo(this.inner,(t,r)=>{for(let[t,n]of r)e(t,n)})}isEmpty(){return el(this.inner)}size(){return this.innerSize}}/**
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
 */let tm=new eu(z.comparator),tp=new eu(z.comparator);function tg(...e){let t=tp;for(let r of e)t=t.insert(r.key,r);return t}function ty(e){let t=tp;return e.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function tw(){return new tf(e=>e.toString(),(e,t)=>e.isEqual(t))}let tv=new eu(z.comparator),t_=new ed(z.comparator);function tE(...e){let t=t_;for(let r of e)t=t.add(r);return t}let tT=new ed(O);/**
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
 */function tI(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:es(t)?"-0":t}}function tS(e){return{integerValue:""+e}}/**
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
 */class tC{constructor(){this._=void 0}}function tb(e,t){return e instanceof tR?eV(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class tD extends tC{}class tA extends tC{constructor(e){super(),this.elements=e}}function tN(e,t){let r=tV(t);for(let t of e.elements)r.some(e=>eA(e,t))||r.push(t);return{arrayValue:{values:r}}}class tk extends tC{constructor(e){super(),this.elements=e}}function tx(e,t){let r=tV(t);for(let t of e.elements)r=r.filter(e=>!eA(e,t));return{arrayValue:{values:r}}}class tR extends tC{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function tL(e){return ev(e.integerValue||e.doubleValue)}function tV(e){return eO(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
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
 */class tO{constructor(e,t){this.field=e,this.transform=t}}class tM{constructor(e,t){this.version=e,this.transformResults=t}}class tP{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tP}static exists(e){return new tP(void 0,e)}static updateTime(e){return new tP(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function tF(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class tU{}function tq(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new tW(e.key,tP.none()):new tz(e.key,e.data,tP.none());{let r=e.data,n=eB.empty(),i=new ed($.comparator);for(let e of t.fields)if(!i.has(e)){let t=r.field(e);null===t&&e.length>1&&(e=e.popLast(),t=r.field(e)),null===t?n.delete(e):n.set(e,t),i=i.add(e)}return new tK(e.key,n,new em(i.toArray()),tP.none())}}function tB(e,t,r,n){return e instanceof tz?function(e,t,r,n){if(!tF(e.precondition,t))return r;let i=e.value.clone(),s=tj(e.fieldTransforms,n,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,r,n):e instanceof tK?function(e,t,r,n){if(!tF(e.precondition,t))return r;let i=tj(e.fieldTransforms,n,t),s=t.data;return(s.setAll(tQ(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===r)?null:r.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,r,n):tF(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):r}function t$(e,t){var r,n;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(r=e.fieldTransforms,n=t.fieldTransforms,!!(void 0===r&&void 0===n||!(!r||!n)&&M(r,n,(e,t)=>{var r,n;return e.field.isEqual(t.field)&&(r=e.transform,n=t.transform,r instanceof tA&&n instanceof tA||r instanceof tk&&n instanceof tk?M(r.elements,n.elements,eA):r instanceof tR&&n instanceof tR?eA(r.Ie,n.Ie):r instanceof tD&&n instanceof tD)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class tz extends tU{constructor(e,t,r,n=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=n,this.type=0}getFieldMask(){return null}}class tK extends tU{constructor(e,t,r,n,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=n,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function tQ(e){let t=new Map;return e.fieldMask.fields.forEach(r=>{if(!r.isEmpty()){let n=e.data.field(r);t.set(r,n)}}),t}function tG(e,t,r){var n;let i=new Map;e.length===r.length||T();for(let s=0;s<r.length;s++){let a=e[s],o=a.transform,l=t.data.field(a.field);i.set(a.field,(n=r[s],o instanceof tA?tN(o,l):o instanceof tk?tx(o,l):n))}return i}function tj(e,t,r){let n=new Map;for(let i of e){let e=i.transform,s=r.data.field(i.field);n.set(i.field,e instanceof tD?function(e,t){let r={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&eE(t)&&(t=eT(t)),t&&(r.fields.__previous_value__=t),{mapValue:r}}(t,s):e instanceof tA?tN(e,s):e instanceof tk?tx(e,s):function(e,t){let r=tb(e,t),n=tL(r)+tL(e.Ie);return eV(r)&&eV(e.Ie)?tS(n):tI(e.serializer,n)}(e,s))}return n}class tW extends tU{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class tH extends tU{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class tY{constructor(e,t,r,n){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=n}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var n;n=r[t],i instanceof tz?function(e,t,r){let n=e.value.clone(),i=tG(e.fieldTransforms,t,r.transformResults);n.setAll(i),t.convertToFoundDocument(r.version,n).setHasCommittedMutations()}(i,e,n):i instanceof tK?function(e,t,r){if(!tF(e.precondition,t))return void t.convertToUnknownDocument(r.version);let n=tG(e.fieldTransforms,t,r.transformResults),i=t.data;i.setAll(tQ(e)),i.setAll(n),t.convertToFoundDocument(r.version,i).setHasCommittedMutations()}(i,e,n):function(e,t,r){t.convertToNoDocument(r.version).setHasCommittedMutations()}(0,e,n)}}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=tB(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=tB(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=tw();return this.mutations.forEach(n=>{let i=e.get(n.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields),o=tq(s,a=t.has(n.key)?null:a);null!==o&&r.set(n.key,o),s.isValidDocument()||s.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tE())}isEqual(e){return this.batchId===e.batchId&&M(this.mutations,e.mutations,(e,t)=>t$(e,t))&&M(this.baseMutations,e.baseMutations,(e,t)=>t$(e,t))}}class tJ{constructor(e,t,r,n){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=n}static from(e,t,r){e.mutations.length===r.length||T();let n=tv,i=e.mutations;for(let e=0;e<i.length;e++)n=n.insert(i[e].key,r[e].version);return new tJ(e,t,r,n)}}/**
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
 */class tX{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class tZ{constructor(e,t){this.count=e,this.unchangedNames=t}}function t0(e){if(void 0===e)return v("GRPC error has no .code"),I.UNKNOWN;switch(e){case n.OK:return I.OK;case n.CANCELLED:return I.CANCELLED;case n.UNKNOWN:return I.UNKNOWN;case n.DEADLINE_EXCEEDED:return I.DEADLINE_EXCEEDED;case n.RESOURCE_EXHAUSTED:return I.RESOURCE_EXHAUSTED;case n.INTERNAL:return I.INTERNAL;case n.UNAVAILABLE:return I.UNAVAILABLE;case n.UNAUTHENTICATED:return I.UNAUTHENTICATED;case n.INVALID_ARGUMENT:return I.INVALID_ARGUMENT;case n.NOT_FOUND:return I.NOT_FOUND;case n.ALREADY_EXISTS:return I.ALREADY_EXISTS;case n.PERMISSION_DENIED:return I.PERMISSION_DENIED;case n.FAILED_PRECONDITION:return I.FAILED_PRECONDITION;case n.ABORTED:return I.ABORTED;case n.OUT_OF_RANGE:return I.OUT_OF_RANGE;case n.UNIMPLEMENTED:return I.UNIMPLEMENTED;case n.DATA_LOSS:return I.DATA_LOSS;default:return T()}}(i=n||(n={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let t1=new c.z8([4294967295,4294967295],0);function t2(e){let t=(new TextEncoder).encode(e),r=new c.V8;return r.update(t),new Uint8Array(r.digest())}function t4(e){let t=new DataView(e.buffer),r=t.getUint32(0,!0),n=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new c.z8([r,n],0),new c.z8([i,s],0)]}class t9{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new t3(`Invalid padding: ${t}`);if(r<0||e.length>0&&0===this.hashCount)throw new t3(`Invalid hash count: ${r}`);if(0===e.length&&0!==t)throw new t3(`Invalid padding when bitmap length is 0: ${t}`);this.Te=8*e.length-t,this.Ee=c.z8.fromNumber(this.Te)}de(e,t,r){let n=e.add(t.multiply(c.z8.fromNumber(r)));return 1===n.compare(t1)&&(n=new c.z8([n.getBits(0),n.getBits(1)],0)),n.modulo(this.Ee).toNumber()}Ae(e){return 0!=(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.Te)return!1;let[t,r]=t4(t2(e));for(let e=0;e<this.hashCount;e++){let n=this.de(t,r,e);if(!this.Ae(n))return!1}return!0}static create(e,t,r){let n=new t9(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return r.forEach(e=>n.insert(e)),n}insert(e){if(0===this.Te)return;let[t,r]=t4(t2(e));for(let e=0;e<this.hashCount;e++){let n=this.de(t,r,e);this.Re(n)}}Re(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class t3 extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class t8{constructor(e,t,r,n,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=n,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let n=new Map;return n.set(e,t5.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new t8(F.min(),n,new eu(O),tm,tE())}}class t5{constructor(e,t,r,n,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=n,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new t5(r,t,tE(),tE(),tE())}}/**
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
 */class t6{constructor(e,t,r,n){this.Ve=e,this.removedTargetIds=t,this.key=r,this.me=n}}class t7{constructor(e,t){this.targetId=e,this.fe=t}}class re{constructor(e,t,r=eg.EMPTY_BYTE_STRING,n=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=n}}class rt{constructor(){this.ge=0,this.pe=ri(),this.ye=eg.EMPTY_BYTE_STRING,this.we=!1,this.Se=!0}get current(){return this.we}get resumeToken(){return this.ye}get be(){return 0!==this.ge}get De(){return this.Se}Ce(e){e.approximateByteSize()>0&&(this.Se=!0,this.ye=e)}ve(){let e=tE(),t=tE(),r=tE();return this.pe.forEach((n,i)=>{switch(i){case 0:e=e.add(n);break;case 2:t=t.add(n);break;case 1:r=r.add(n);break;default:T()}}),new t5(this.ye,this.we,e,t,r)}Fe(){this.Se=!1,this.pe=ri()}Me(e,t){this.Se=!0,this.pe=this.pe.insert(e,t)}xe(e){this.Se=!0,this.pe=this.pe.remove(e)}Oe(){this.ge+=1}Ne(){this.ge-=1,this.ge>=0||T()}Le(){this.Se=!0,this.we=!0}}class rr{constructor(e){this.Be=e,this.ke=new Map,this.qe=tm,this.Qe=rn(),this.Ke=new eu(O)}$e(e){for(let t of e.Ve)e.me&&e.me.isFoundDocument()?this.Ue(t,e.me):this.We(t,e.key,e.me);for(let t of e.removedTargetIds)this.We(t,e.key,e.me)}Ge(e){this.forEachTarget(e,t=>{let r=this.ze(t);switch(e.state){case 0:this.je(t)&&r.Ce(e.resumeToken);break;case 1:r.Ne(),r.be||r.Fe(),r.Ce(e.resumeToken);break;case 2:r.Ne(),r.be||this.removeTarget(t);break;case 3:this.je(t)&&(r.Le(),r.Ce(e.resumeToken));break;case 4:this.je(t)&&(this.He(t),r.Ce(e.resumeToken));break;default:T()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ke.forEach((e,r)=>{this.je(r)&&t(r)})}Je(e){let t=e.targetId,r=e.fe.count,n=this.Ye(t);if(n){let i=n.target;if(te(i)){if(0===r){let e=new z(i.path);this.We(t,e,e$.newNoDocument(e,F.min()))}else 1===r||T()}else{let n=this.Ze(t);if(n!==r){let r=this.Xe(e),i=r?this.et(r,e,n):1;0!==i&&(this.He(t),this.Ke=this.Ke.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch"))}}}}Xe(e){let t,r;let n=e.fe.unchangedNames;if(!n||!n.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=n;try{t=e_(i).toUint8Array()}catch(e){if(e instanceof ep)return _("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{r=new t9(t,s,a)}catch(e){return _(e instanceof t3?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===r.Te?null:r}et(e,t,r){return t.fe.count===r-this.rt(e,t.targetId)?0:2}rt(e,t){let r=this.Be.getRemoteKeysForTarget(t),n=0;return r.forEach(r=>{let i=this.Be.nt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;e.mightContain(s)||(this.We(t,r,null),n++)}),n}it(e){let t=new Map;this.ke.forEach((r,n)=>{let i=this.Ye(n);if(i){if(r.current&&te(i.target)){let t=new z(i.target.path);null!==this.qe.get(t)||this.st(n,t)||this.We(n,t,e$.newNoDocument(t,e))}r.De&&(t.set(n,r.ve()),r.Fe())}});let r=tE();this.Qe.forEach((e,t)=>{let n=!0;t.forEachWhile(e=>{let t=this.Ye(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(n=!1,!1)}),n&&(r=r.add(e))}),this.qe.forEach((t,r)=>r.setReadTime(e));let n=new t8(e,t,this.Ke,this.qe,r);return this.qe=tm,this.Qe=rn(),this.Ke=new eu(O),n}Ue(e,t){if(!this.je(e))return;let r=this.st(e,t.key)?2:0;this.ze(e).Me(t.key,r),this.qe=this.qe.insert(t.key,t),this.Qe=this.Qe.insert(t.key,this.ot(t.key).add(e))}We(e,t,r){if(!this.je(e))return;let n=this.ze(e);this.st(e,t)?n.Me(t,1):n.xe(t),this.Qe=this.Qe.insert(t,this.ot(t).delete(e)),r&&(this.qe=this.qe.insert(t,r))}removeTarget(e){this.ke.delete(e)}Ze(e){let t=this.ze(e).ve();return this.Be.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Oe(e){this.ze(e).Oe()}ze(e){let t=this.ke.get(e);return t||(t=new rt,this.ke.set(e,t)),t}ot(e){let t=this.Qe.get(e);return t||(t=new ed(O),this.Qe=this.Qe.insert(e,t)),t}je(e){let t=null!==this.Ye(e);return t||w("WatchChangeAggregator","Detected inactive target",e),t}Ye(e){let t=this.ke.get(e);return t&&t.be?null:this.Be._t(e)}He(e){this.ke.set(e,new rt),this.Be.getRemoteKeysForTarget(e).forEach(t=>{this.We(e,t,null)})}st(e,t){return this.Be.getRemoteKeysForTarget(e).has(t)}}function rn(){return new eu(z.comparator)}function ri(){return new eu(z.comparator)}let rs={asc:"ASCENDING",desc:"DESCENDING"},ra={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ro={and:"AND",or:"OR"};class rl{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ru(e,t){return e.useProto3Json||null==t?t:{value:t}}function rh(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function rc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function rd(e){return e||T(),F.fromTimestamp(function(e){let t=ew(e);return new P(t.seconds,t.nanos)}(e))}function rf(e,t){return rm(e,t).canonicalString()}function rm(e,t){let r=new q(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?r:r.child(t)}function rp(e){let t=q.fromString(e);return rS(t)||T(),t}function rg(e,t){return rf(e.databaseId,t.path)}function ry(e,t){let r=rp(t);if(r.get(1)!==e.databaseId.projectId)throw new S(I.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+e.databaseId.projectId);if(r.get(3)!==e.databaseId.database)throw new S(I.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+e.databaseId.database);return new z(r_(r))}function rw(e,t){return rf(e.databaseId,t)}function rv(e){return new q(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function r_(e){return e.length>4&&"documents"===e.get(4)||T(),e.popFirst(5)}function rE(e,t,r){return{name:rg(e,t),fields:r.value.mapValue.fields}}function rT(e){return{fieldPath:e.canonicalString()}}function rI(e){return $.fromServerFormat(e.fieldPath)}function rS(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
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
 */class rC{constructor(e,t,r,n,i=F.min(),s=F.min(),a=eg.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=n,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new rC(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new rC(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new rC(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new rC(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class rb{constructor(e){this.ct=e}}/**
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
 */class rD{constructor(){}Pt(e,t){this.It(e,t),t.Tt()}It(e,t){if("nullValue"in e)this.Et(t,5);else if("booleanValue"in e)this.Et(t,10),t.dt(e.booleanValue?1:0);else if("integerValue"in e)this.Et(t,15),t.dt(ev(e.integerValue));else if("doubleValue"in e){let r=ev(e.doubleValue);isNaN(r)?this.Et(t,13):(this.Et(t,15),es(r)?t.dt(0):t.dt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Et(t,20),"string"==typeof r?t.At(r):(t.At(`${r.seconds||""}`),t.dt(r.nanos||0))}else if("stringValue"in e)this.Rt(e.stringValue,t),this.Vt(t);else if("bytesValue"in e)this.Et(t,30),t.ft(e_(e.bytesValue)),this.Vt(t);else if("referenceValue"in e)this.gt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Et(t,45),t.dt(r.latitude||0),t.dt(r.longitude||0)}else"mapValue"in e?eq(e)?this.Et(t,Number.MAX_SAFE_INTEGER):(this.yt(e.mapValue,t),this.Vt(t)):"arrayValue"in e?(this.wt(e.arrayValue,t),this.Vt(t)):T()}Rt(e,t){this.Et(t,25),this.St(e,t)}St(e,t){t.At(e)}yt(e,t){let r=e.fields||{};for(let e of(this.Et(t,55),Object.keys(r)))this.Rt(e,t),this.It(r[e],t)}wt(e,t){let r=e.values||[];for(let e of(this.Et(t,50),r))this.It(e,t)}gt(e,t){this.Et(t,37),z.fromName(e).path.forEach(e=>{this.Et(t,60),this.St(e,t)})}Et(e,t){e.dt(t)}Vt(e){e.dt(2)}}rD.bt=new rD;/**
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
 */class rA{constructor(){this._n=new rN}addToCollectionParentIndex(e,t){return this._n.add(t),W.resolve()}getCollectionParents(e,t){return W.resolve(this._n.getEntries(t))}addFieldIndex(e,t){return W.resolve()}deleteFieldIndex(e,t){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,t){return W.resolve()}getDocumentsMatchingTarget(e,t){return W.resolve(null)}getIndexType(e,t){return W.resolve(0)}getFieldIndexes(e,t){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,t){return W.resolve(Q.min())}getMinOffsetFromCollectionGroup(e,t){return W.resolve(Q.min())}updateCollectionGroup(e,t,r){return W.resolve()}updateIndexEntries(e,t){return W.resolve()}}class rN{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t]||new ed(q.comparator),i=!n.has(r);return this.index[t]=n.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),n=this.index[t];return n&&n.has(r)}getEntries(e){return(this.index[e]||new ed(q.comparator)).toArray()}}new Uint8Array(0);class rk{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new rk(e,rk.DEFAULT_COLLECTION_PERCENTILE,rk.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */rk.DEFAULT_COLLECTION_PERCENTILE=10,rk.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rk.DEFAULT=new rk(41943040,rk.DEFAULT_COLLECTION_PERCENTILE,rk.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rk.DISABLED=new rk(-1,0,0);/**
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
 */class rx{constructor(e){this.On=e}next(){return this.On+=2,this.On}static Nn(){return new rx(0)}static Ln(){return new rx(-1)}}/**
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
 */class rR{constructor(){this.changes=new tf(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,e$.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return void 0!==r?W.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class rL{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class rV{constructor(e,t,r,n){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=n}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(n=>(r=n,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==r&&tB(r.mutation,e,em.empty(),P.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tE()).next(()=>t))}getLocalViewOfDocuments(e,t,r=tE()){let n=tw();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,r).next(e=>{let t=tg();return e.forEach((e,r)=>{t=t.insert(e,r.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let r=tw();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,tE()))}populateOverlays(e,t,r){let n=[];return r.forEach(e=>{t.has(e)||n.push(e)}),this.documentOverlayCache.getOverlays(e,n).next(e=>{e.forEach((e,r)=>{t.set(e,r)})})}computeViews(e,t,r,n){let i=tm,s=tw(),a=tw();return t.forEach((e,t)=>{let a=r.get(t.key);n.has(t.key)&&(void 0===a||a.mutation instanceof tK)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),tB(a.mutation,t,a.mutation.getFieldMask(),P.now())):s.set(t.key,em.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>{var r;return a.set(e,new rL(t,null!==(r=s.get(e))&&void 0!==r?r:null))}),a))}recalculateAndSaveOverlays(e,t){let r=tw(),n=new eu((e,t)=>e-t),i=tE();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=r.get(e)||em.empty();a=i.applyToLocalView(s,a),r.set(e,a);let o=(n.get(i.batchId)||tE()).add(e);n=n.insert(i.batchId,o)})}).next(()=>{let s=[],a=n.getReverseIterator();for(;a.hasNext();){let n=a.getNext(),o=n.key,l=n.value,u=tw();l.forEach(e=>{if(!i.has(e)){let n=tq(t.get(e),r.get(e));null!==n&&u.set(e,n),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,u))}return W.waitFor(s)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,r,n){return z.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):tn(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,n):this.getDocumentsMatchingCollectionQuery(e,t,r,n)}getNextDocuments(e,t,r,n){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,n).next(i=>{let s=n-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,n-i.size):W.resolve(tw()),a=-1,o=i;return s.next(t=>W.forEach(t,(t,r)=>(a<r.largestBatchId&&(a=r.largestBatchId),i.get(t)?W.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,tE())).next(e=>({batchId:a,changes:ty(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new z(t)).next(e=>{let t=tg();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,r,n){let i=t.collectionGroup,s=tg();return this.indexManager.getCollectionParents(e,i).next(a=>W.forEach(a,a=>{let o=new tt(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,r,n).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,r,n){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,n))).next(e=>{i.forEach((t,r)=>{let n=r.getKey();null===e.get(n)&&(e=e.insert(n,e$.newInvalidDocument(n)))});let r=tg();return e.forEach((e,n)=>{let s=i.get(e);void 0!==s&&tB(s.mutation,n,em.empty(),P.now()),tc(t,n)&&(r=r.insert(e,n))}),r})}}/**
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
 */class rO{constructor(e){this.serializer=e,this.cr=new Map,this.lr=new Map}getBundleMetadata(e,t){return W.resolve(this.cr.get(t))}saveBundleMetadata(e,t){return this.cr.set(t.id,{id:t.id,version:t.version,createTime:rd(t.createTime)}),W.resolve()}getNamedQuery(e,t){return W.resolve(this.lr.get(t))}saveNamedQuery(e,t){return this.lr.set(t.name,{name:t.name,query:function(e){let t=function(e){var t;let r,n=function(e){let t=rp(e);return 4===t.length?q.emptyPath():r_(t)}(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){1===s||T();let e=i.from[0];e.allDescendants?a=e.collectionId:n=n.child(e.collectionId)}let o=[];i.where&&(o=function(e){var t;let r=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=rI(e.unaryFilter.field);return eW.create(t,"==",{doubleValue:NaN});case"IS_NULL":let r=rI(e.unaryFilter.field);return eW.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let n=rI(e.unaryFilter.field);return eW.create(n,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=rI(e.unaryFilter.field);return eW.create(i,"!=",{nullValue:"NULL_VALUE"});default:return T()}}(t):void 0!==t.fieldFilter?eW.create(rI(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return T()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?eH.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return T()}}(t.compositeFilter.op)):T()}(e);return r instanceof eH&&eJ(t=r)&&eY(t)?r.getFilters():[r]}(i.where));let l=[];i.orderBy&&(l=i.orderBy.map(e=>new eG(rI(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let u=null;i.limit&&(u=null==(r="object"==typeof(t=i.limit)?t.value:t)?null:r);let h=null;i.startAt&&(h=function(e){let t=!!e.before;return new ez(e.values||[],t)}(i.startAt));let c=null;return i.endAt&&(c=function(e){let t=!e.before;return new ez(e.values||[],t)}(i.endAt)),new tt(n,a,l,o,u,"F",h,c)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?to(t,t.limit,"L"):t}(t.bundledQuery),readTime:rd(t.readTime)}),W.resolve()}}/**
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
 */class rM{constructor(){this.overlays=new eu(z.comparator),this.hr=new Map}getOverlay(e,t){return W.resolve(this.overlays.get(t))}getOverlays(e,t){let r=tw();return W.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&r.set(t,e)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((r,n)=>{this.ht(e,t,n)}),W.resolve()}removeOverlaysForBatchId(e,t,r){let n=this.hr.get(r);return void 0!==n&&(n.forEach(e=>this.overlays=this.overlays.remove(e)),this.hr.delete(r)),W.resolve()}getOverlaysForCollection(e,t,r){let n=tw(),i=t.length+1,s=new z(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>r&&n.set(e.getKey(),e)}return W.resolve(n)}getOverlaysForCollectionGroup(e,t,r,n){let i=new eu((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>r){let t=i.get(e.largestBatchId);null===t&&(t=tw(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tw(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=n)););return W.resolve(a)}ht(e,t,r){let n=this.overlays.get(r.key);if(null!==n){let e=this.hr.get(n.largestBatchId).delete(r.key);this.hr.set(n.largestBatchId,e)}this.overlays=this.overlays.insert(r.key,new tX(t,r));let i=this.hr.get(t);void 0===i&&(i=tE(),this.hr.set(t,i)),this.hr.set(t,i.add(r.key))}}/**
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
 */class rP{constructor(){this.Pr=new ed(rF.Ir),this.Tr=new ed(rF.Er)}isEmpty(){return this.Pr.isEmpty()}addReference(e,t){let r=new rF(e,t);this.Pr=this.Pr.add(r),this.Tr=this.Tr.add(r)}dr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Ar(new rF(e,t))}Rr(e,t){e.forEach(e=>this.removeReference(e,t))}Vr(e){let t=new z(new q([])),r=new rF(t,e),n=new rF(t,e+1),i=[];return this.Tr.forEachInRange([r,n],e=>{this.Ar(e),i.push(e.key)}),i}mr(){this.Pr.forEach(e=>this.Ar(e))}Ar(e){this.Pr=this.Pr.delete(e),this.Tr=this.Tr.delete(e)}gr(e){let t=new z(new q([])),r=new rF(t,e),n=new rF(t,e+1),i=tE();return this.Tr.forEachInRange([r,n],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new rF(e,0),r=this.Pr.firstAfterOrEqual(t);return null!==r&&e.isEqual(r.key)}}class rF{constructor(e,t){this.key=e,this.pr=t}static Ir(e,t){return z.comparator(e.key,t.key)||O(e.pr,t.pr)}static Er(e,t){return O(e.pr,t.pr)||z.comparator(e.key,t.key)}}/**
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
 */class rU{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.yr=1,this.wr=new ed(rF.Ir)}checkEmpty(e){return W.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,r,n){let i=this.yr;this.yr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new tY(i,t,r,n);for(let t of(this.mutationQueue.push(s),n))this.wr=this.wr.add(new rF(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return W.resolve(s)}lookupMutationBatch(e,t){return W.resolve(this.Sr(t))}getNextMutationBatchAfterBatchId(e,t){let r=this.br(t+1),n=r<0?0:r;return W.resolve(this.mutationQueue.length>n?this.mutationQueue[n]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(0===this.mutationQueue.length?-1:this.yr-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new rF(t,0),n=new rF(t,Number.POSITIVE_INFINITY),i=[];return this.wr.forEachInRange([r,n],e=>{let t=this.Sr(e.pr);i.push(t)}),W.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ed(O);return t.forEach(e=>{let t=new rF(e,0),n=new rF(e,Number.POSITIVE_INFINITY);this.wr.forEachInRange([t,n],e=>{r=r.add(e.pr)})}),W.resolve(this.Dr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,n=r.length+1,i=r;z.isDocumentKey(i)||(i=i.child(""));let s=new rF(new z(i),0),a=new ed(O);return this.wr.forEachWhile(e=>{let t=e.key.path;return!!r.isPrefixOf(t)&&(t.length===n&&(a=a.add(e.pr)),!0)},s),W.resolve(this.Dr(a))}Dr(e){let t=[];return e.forEach(e=>{let r=this.Sr(e);null!==r&&t.push(r)}),t}removeMutationBatch(e,t){0===this.Cr(t.batchId,"removed")||T(),this.mutationQueue.shift();let r=this.wr;return W.forEach(t.mutations,n=>{let i=new rF(n.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,n.key)}).next(()=>{this.wr=r})}Mn(e){}containsKey(e,t){let r=new rF(t,0),n=this.wr.firstAfterOrEqual(r);return W.resolve(t.isEqual(n&&n.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}Cr(e,t){return this.br(e)}br(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Sr(e){let t=this.br(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class rq{constructor(e){this.vr=e,this.docs=new eu(z.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,n=this.docs.get(r),i=n?n.size:0,s=this.vr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return W.resolve(r?r.document.mutableCopy():e$.newInvalidDocument(t))}getEntries(e,t){let r=tm;return t.forEach(e=>{let t=this.docs.get(e);r=r.insert(e,t?t.document.mutableCopy():e$.newInvalidDocument(e))}),W.resolve(r)}getDocumentsMatchingQuery(e,t,r,n){let i=tm,s=t.path,a=new z(s.child("")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=function(e,t){let r=e.readTime.compareTo(t.readTime);return 0!==r?r:0!==(r=z.comparator(e.documentKey,t.documentKey))?r:O(e.largestBatchId,t.largestBatchId)}(new Q(a.readTime,a.key,-1),r)||(n.has(a.key)||tc(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return W.resolve(i)}getAllFromCollectionGroup(e,t,r,n){T()}Fr(e,t){return W.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new rB(this)}getSize(e){return W.resolve(this.size)}}class rB extends rR{constructor(e){super(),this.ar=e}applyChanges(e){let t=[];return this.changes.forEach((r,n)=>{n.isValidDocument()?t.push(this.ar.addEntry(e,n)):this.ar.removeEntry(r)}),W.waitFor(t)}getFromCache(e,t){return this.ar.getEntry(e,t)}getAllFromCache(e,t){return this.ar.getEntries(e,t)}}/**
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
 */class r${constructor(e){this.persistence=e,this.Mr=new tf(e=>e6(e),e7),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.Or=0,this.Nr=new rP,this.targetCount=0,this.Lr=rx.Nn()}forEachTarget(e,t){return this.Mr.forEach((e,r)=>t(r)),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.Or)}allocateTargetId(e){return this.highestTargetId=this.Lr.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Or&&(this.Or=t),W.resolve()}qn(e){this.Mr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.Lr=new rx(t),this.highestTargetId=t),e.sequenceNumber>this.Or&&(this.Or=e.sequenceNumber)}addTargetData(e,t){return this.qn(t),this.targetCount+=1,W.resolve()}updateTargetData(e,t){return this.qn(t),W.resolve()}removeTargetData(e,t){return this.Mr.delete(t.target),this.Nr.Vr(t.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,t,r){let n=0,i=[];return this.Mr.forEach((s,a)=>{a.sequenceNumber<=t&&null===r.get(a.targetId)&&(this.Mr.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),n++)}),W.waitFor(i).next(()=>n)}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,t){let r=this.Mr.get(t)||null;return W.resolve(r)}addMatchingKeys(e,t,r){return this.Nr.dr(t,r),W.resolve()}removeMatchingKeys(e,t,r){this.Nr.Rr(t,r);let n=this.persistence.referenceDelegate,i=[];return n&&t.forEach(t=>{i.push(n.markPotentiallyOrphaned(e,t))}),W.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Nr.Vr(t),W.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Nr.gr(t);return W.resolve(r)}containsKey(e,t){return W.resolve(this.Nr.containsKey(t))}}/**
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
 */class rz{constructor(e,t){this.Br={},this.overlays={},this.kr=new ei(0),this.qr=!1,this.qr=!0,this.referenceDelegate=e(this),this.Qr=new r$(this),this.indexManager=new rA,this.remoteDocumentCache=new rq(e=>this.referenceDelegate.Kr(e)),this.serializer=new rb(t),this.$r=new rO(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.qr=!1,Promise.resolve()}get started(){return this.qr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new rM,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Br[e.toKey()];return r||(r=new rU(t,this.referenceDelegate),this.Br[e.toKey()]=r),r}getTargetCache(){return this.Qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.$r}runTransaction(e,t,r){w("MemoryPersistence","Starting transaction:",e);let n=new rK(this.kr.next());return this.referenceDelegate.Ur(),r(n).next(e=>this.referenceDelegate.Wr(n).next(()=>e)).toPromise().then(e=>(n.raiseOnCommittedEvent(),e))}Gr(e,t){return W.or(Object.values(this.Br).map(r=>()=>r.containsKey(e,t)))}}class rK extends G{constructor(e){super(),this.currentSequenceNumber=e}}class rQ{constructor(e){this.persistence=e,this.zr=new rP,this.jr=null}static Hr(e){return new rQ(e)}get Jr(){if(this.jr)return this.jr;throw T()}addReference(e,t,r){return this.zr.addReference(r,t),this.Jr.delete(r.toString()),W.resolve()}removeReference(e,t,r){return this.zr.removeReference(r,t),this.Jr.add(r.toString()),W.resolve()}markPotentiallyOrphaned(e,t){return this.Jr.add(t.toString()),W.resolve()}removeTarget(e,t){this.zr.Vr(t.targetId).forEach(e=>this.Jr.add(e.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Jr.add(e.toString()))}).next(()=>r.removeTargetData(e,t))}Ur(){this.jr=new Set}Wr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.Jr,r=>{let n=z.fromPath(r);return this.Yr(e,n).next(e=>{e||t.removeEntry(n,F.min())})}).next(()=>(this.jr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yr(e,t).next(e=>{e?this.Jr.delete(t.toString()):this.Jr.add(t.toString())})}Kr(e){return 0}Yr(e,t){return W.or([()=>W.resolve(this.zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gr(e,t)])}}/**
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
 */class rG{constructor(e,t,r,n){this.targetId=e,this.fromCache=t,this.qi=r,this.Qi=n}static Ki(e,t){let r=tE(),n=tE();for(let e of t.docChanges)switch(e.type){case 0:r=r.add(e.doc.key);break;case 1:n=n.add(e.doc.key)}return new rG(e,t.fromCache,r,n)}}/**
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
 */class rj{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class rW{constructor(){this.$i=!1,this.Ui=!1,this.Wi=100,this.Gi=(0,h.G6)()?8:Y.v((0,h.z$)())>0?6:4}initialize(e,t){this.zi=e,this.indexManager=t,this.$i=!0}getDocumentsMatchingQuery(e,t,r,n){let i={result:null};return this.ji(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.Hi(e,t,n,r).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let r=new rj;return this.Ji(e,t,r).next(n=>{if(i.result=n,this.Ui)return this.Yi(e,t,r,n.size)})}).next(()=>i.result)}Yi(e,t,r,n){return r.documentReadCount<this.Wi?(y()<=u.in.DEBUG&&w("QueryEngine","SDK will not create cache indexes for query:",th(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Wi,"documents"),W.resolve()):(y()<=u.in.DEBUG&&w("QueryEngine","Query:",th(t),"scans",r.documentReadCount,"local documents and returns",n,"documents as results."),r.documentReadCount>this.Gi*n?(y()<=u.in.DEBUG&&w("QueryEngine","The SDK decides to create cache indexes for query:",th(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ts(t))):W.resolve())}ji(e,t){if(tr(t))return W.resolve(null);let r=ts(t);return this.indexManager.getIndexType(e,r).next(n=>0===n?null:(null!==t.limit&&1===n&&(r=ts(t=to(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,r).next(n=>{let i=tE(...n);return this.zi.getDocuments(e,i).next(n=>this.indexManager.getMinOffset(e,r).next(r=>{let s=this.Zi(t,n);return this.Xi(t,s,i,r.readTime)?this.ji(e,to(t,null,"F")):this.es(e,s,t,r)}))})))}Hi(e,t,r,n){return tr(t)||n.isEqual(F.min())?W.resolve(null):this.zi.getDocuments(e,r).next(i=>{let s=this.Zi(t,i);return this.Xi(t,s,r,n)?W.resolve(null):(y()<=u.in.DEBUG&&w("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),th(t)),this.es(e,s,t,function(e,t){let r=e.toTimestamp().seconds,n=e.toTimestamp().nanoseconds+1;return new Q(F.fromTimestamp(1e9===n?new P(r+1,0):new P(r,n)),z.empty(),-1)}(n,0)).next(e=>e))})}Zi(e,t){let r=new ed(td(e));return t.forEach((t,n)=>{tc(e,n)&&(r=r.add(n))}),r}Xi(e,t,r,n){if(null===e.limit)return!1;if(r.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(n)>0)}Ji(e,t,r){return y()<=u.in.DEBUG&&w("QueryEngine","Using full collection scan to execute query:",th(t)),this.zi.getDocumentsMatchingQuery(e,t,Q.min(),r)}es(e,t,r,n){return this.zi.getDocumentsMatchingQuery(e,r,n).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
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
 */class rH{constructor(e,t,r,n){this.persistence=e,this.ts=t,this.serializer=n,this.ns=new eu(O),this.rs=new tf(e=>e6(e),e7),this.ss=new Map,this.os=e.getRemoteDocumentCache(),this.Qr=e.getTargetCache(),this.$r=e.getBundleCache(),this._s(r)}_s(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new rV(this.os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.os.setIndexManager(this.indexManager),this.ts.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ns))}}async function rY(e,t){return await e.persistence.runTransaction("Handle user change","readonly",r=>{let n;return e.mutationQueue.getAllMutationBatches(r).next(i=>(n=i,e._s(t),e.mutationQueue.getAllMutationBatches(r))).next(t=>{let i=[],s=[],a=tE();for(let e of n)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(r,a).next(e=>({us:e,removedBatchIds:i,addedBatchIds:s}))})})}function rJ(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Qr.getLastRemoteSnapshotVersion(t))}async function rX(e,t,r){let n=e.ns.get(t);try{r||await e.persistence.runTransaction("Release target",r?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,n))}catch(e){if(!Z(e))throw e;w("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}e.ns=e.ns.remove(t),e.rs.delete(n.target)}function rZ(e,t,r){let n=F.min(),i=tE();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,r){let n=e.rs.get(r);return void 0!==n?W.resolve(e.ns.get(n)):e.Qr.getTargetData(t,r)})(e,s,ts(t)).next(t=>{if(t)return n=t.lastLimboFreeSnapshotVersion,e.Qr.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.ts.getDocumentsMatchingQuery(s,t,r?n:F.min(),r?i:tE())).next(r=>{var n;let s;return n=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),s=e.ss.get(n)||F.min(),r.forEach((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)}),e.ss.set(n,s),{documents:r,hs:i}}))}class r0{constructor(){this.activeTargetIds=tT}As(e){this.activeTargetIds=this.activeTargetIds.add(e)}Rs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ds(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class r1{constructor(){this.no=new r0,this.ro={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.no.As(e),this.ro[e]||"not-current"}updateQueryState(e,t,r){this.ro[e]=t}removeLocalQueryTarget(e){this.no.Rs(e)}isLocalQueryTarget(e){return this.no.activeTargetIds.has(e)}clearQueryState(e){delete this.ro[e]}getAllActiveQueryTargets(){return this.no.activeTargetIds}isActiveQueryTarget(e){return this.no.activeTargetIds.has(e)}start(){return this.no=new r0,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class r2{io(e){}shutdown(){}}/**
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
 */class r4{constructor(){this.so=()=>this.oo(),this._o=()=>this.ao(),this.uo=[],this.co()}io(e){this.uo.push(e)}shutdown(){window.removeEventListener("online",this.so),window.removeEventListener("offline",this._o)}co(){window.addEventListener("online",this.so),window.addEventListener("offline",this._o)}oo(){for(let e of(w("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.uo))e(0)}ao(){for(let e of(w("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.uo))e(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
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
 */let r9=null;function r3(){return null===r9?r9=268435456+Math.round(2147483648*Math.random()):r9++,"0x"+r9.toString(16)}/**
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
 */let r8={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class r5{constructor(e){this.lo=e.lo,this.ho=e.ho}Po(e){this.Io=e}To(e){this.Eo=e}onMessage(e){this.Ao=e}close(){this.ho()}send(e){this.lo(e)}Ro(){this.Io()}Vo(e){this.Eo(e)}mo(e){this.Ao(e)}}/**
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
 */let r6="WebChannelConnection";class r7 extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),n=encodeURIComponent(this.databaseId.database);this.fo=t+"://"+e.host,this.po=`projects/${r}/databases/${n}`,this.yo="(default)"===this.databaseId.database?`project_id=${r}`:`project_id=${r}&database_id=${n}`}get wo(){return!1}So(e,t,r,n,i){let s=r3(),a=this.bo(e,t.toUriEncodedString());w("RestConnection",`Sending RPC '${e}' ${s}:`,a,r);let o={"google-cloud-resource-prefix":this.po,"x-goog-request-params":this.yo};return this.Do(o,n,i),this.Co(e,a,o,r).then(t=>(w("RestConnection",`Received RPC '${e}' ${s}: `,t),t),t=>{throw _("RestConnection",`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",r),t})}vo(e,t,r,n,i,s){return this.So(e,t,r,n,i)}Do(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+p}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,r)=>e[r]=t),r&&r.headers.forEach((t,r)=>e[r]=t)}bo(e,t){let r=r8[e];return`${this.fo}/v1/${t}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Co(e,t,r,n){let i=r3();return new Promise((s,a)=>{let o=new c.JJ;o.setWithCredentials(!0),o.listenOnce(c.tw.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case c.jK.NO_ERROR:let t=o.getResponseJson();w(r6,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case c.jK.TIMEOUT:w(r6,`RPC '${e}' ${i} timed out`),a(new S(I.DEADLINE_EXCEEDED,"Request time out"));break;case c.jK.HTTP_ERROR:let r=o.getStatus();if(w(r6,`RPC '${e}' ${i} failed with status:`,r,"response text:",o.getResponseText()),r>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(I).indexOf(t)>=0?t:I.UNKNOWN}(t.status);a(new S(e,t.message))}else a(new S(I.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new S(I.UNAVAILABLE,"Connection failed."));break;default:T()}}finally{w(r6,`RPC '${e}' ${i} completed.`)}});let l=JSON.stringify(n);w(r6,`RPC '${e}' ${i} sending request:`,n),o.send(t,"POST",l,r,15)})}Fo(e,t,r){let i=r3(),s=[this.fo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=(0,c.UE)(),o=(0,c.FJ)(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Do(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let h=s.join("");w(r6,`Creating RPC '${e}' stream ${i}: ${h}`,l);let d=a.createWebChannel(h,l),f=!1,m=!1,p=new r5({lo:t=>{m?w(r6,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(f||(w(r6,`Opening RPC '${e}' stream ${i} transport.`),d.open(),f=!0),w(r6,`RPC '${e}' stream ${i} sending:`,t),d.send(t))},ho:()=>d.close()}),g=(e,t,r)=>{e.listen(t,e=>{try{r(e)}catch(e){setTimeout(()=>{throw e},0)}})};return g(d,c.ii.EventType.OPEN,()=>{m||w(r6,`RPC '${e}' stream ${i} transport opened.`)}),g(d,c.ii.EventType.CLOSE,()=>{m||(m=!0,w(r6,`RPC '${e}' stream ${i} transport closed`),p.Vo())}),g(d,c.ii.EventType.ERROR,t=>{m||(m=!0,_(r6,`RPC '${e}' stream ${i} transport errored:`,t),p.Vo(new S(I.UNAVAILABLE,"The operation could not be completed")))}),g(d,c.ii.EventType.MESSAGE,t=>{var r;if(!m){let s=t.data[0];s||T();let a=s.error||(null===(r=s[0])||void 0===r?void 0:r.error);if(a){w(r6,`RPC '${e}' stream ${i} received error:`,a);let t=a.status,r=function(e){let t=n[e];if(void 0!==t)return t0(t)}(t),s=a.message;void 0===r&&(r=I.INTERNAL,s="Unknown error status: "+t+" with message "+a.message),m=!0,p.Vo(new S(r,s)),d.close()}else w(r6,`RPC '${e}' stream ${i} received:`,s),p.mo(s)}}),g(o,c.ju.STAT_EVENT,t=>{t.stat===c.kN.PROXY?w(r6,`RPC '${e}' stream ${i} detected buffering proxy`):t.stat===c.kN.NOPROXY&&w(r6,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{p.Ro()},0),p}}function ne(){return"undefined"!=typeof document?document:null}/**
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
 */function nt(e){return new rl(e,!0)}/**
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
 */class nr{constructor(e,t,r=1e3,n=1.5,i=6e4){this.oi=e,this.timerId=t,this.Mo=r,this.xo=n,this.Oo=i,this.No=0,this.Lo=null,this.Bo=Date.now(),this.reset()}reset(){this.No=0}ko(){this.No=this.Oo}qo(e){this.cancel();let t=Math.floor(this.No+this.Qo()),r=Math.max(0,Date.now()-this.Bo),n=Math.max(0,t-r);n>0&&w("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.No} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Lo=this.oi.enqueueAfterDelay(this.timerId,n,()=>(this.Bo=Date.now(),e())),this.No*=this.xo,this.No<this.Mo&&(this.No=this.Mo),this.No>this.Oo&&(this.No=this.Oo)}Ko(){null!==this.Lo&&(this.Lo.skipDelay(),this.Lo=null)}cancel(){null!==this.Lo&&(this.Lo.cancel(),this.Lo=null)}Qo(){return(Math.random()-.5)*this.No}}/**
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
 */class nn{constructor(e,t,r,n,i,s,a,o){this.oi=e,this.$o=r,this.Uo=n,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.Wo=0,this.Go=null,this.zo=null,this.stream=null,this.jo=new nr(e,t)}Ho(){return 1===this.state||5===this.state||this.Jo()}Jo(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Yo()}async stop(){this.Ho()&&await this.close(0)}Zo(){this.state=0,this.jo.reset()}Xo(){this.Jo()&&null===this.Go&&(this.Go=this.oi.enqueueAfterDelay(this.$o,6e4,()=>this.e_()))}t_(e){this.n_(),this.stream.send(e)}async e_(){if(this.Jo())return this.close(0)}n_(){this.Go&&(this.Go.cancel(),this.Go=null)}r_(){this.zo&&(this.zo.cancel(),this.zo=null)}async close(e,t){this.n_(),this.r_(),this.jo.cancel(),this.Wo++,4!==e?this.jo.reset():t&&t.code===I.RESOURCE_EXHAUSTED?(v(t.toString()),v("Using maximum backoff delay to prevent overloading the backend."),this.jo.ko()):t&&t.code===I.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.i_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.To(t)}i_(){}auth(){this.state=1;let e=this.s_(this.Wo),t=this.Wo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,r])=>{this.Wo===t&&this.o_(e,r)},t=>{e(()=>{let e=new S(I.UNKNOWN,"Fetching auth token failed: "+t.message);return this.__(e)})})}o_(e,t){let r=this.s_(this.Wo);this.stream=this.a_(e,t),this.stream.Po(()=>{r(()=>(this.state=2,this.zo=this.oi.enqueueAfterDelay(this.Uo,1e4,()=>(this.Jo()&&(this.state=3),Promise.resolve())),this.listener.Po()))}),this.stream.To(e=>{r(()=>this.__(e))}),this.stream.onMessage(e=>{r(()=>this.onMessage(e))})}Yo(){this.state=5,this.jo.qo(async()=>{this.state=0,this.start()})}__(e){return w("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}s_(e){return t=>{this.oi.enqueueAndForget(()=>this.Wo===e?t():(w("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ni extends nn{constructor(e,t,r,n,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i}a_(e,t){return this.connection.Fo("Listen",e,t)}onMessage(e){this.jo.reset();let t=function(e,t){let r;if("targetChange"in t){var n,i;t.targetChange;let s="NO_CHANGE"===(n=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===n?1:"REMOVE"===n?2:"CURRENT"===n?3:"RESET"===n?4:T(),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(void 0===i||"string"==typeof i||T(),eg.fromBase64String(i||"")):(void 0===i||i instanceof Uint8Array||T(),eg.fromUint8Array(i||new Uint8Array))),l=t.targetChange.cause;r=new re(s,a,o,l&&new S(void 0===l.code?I.UNKNOWN:t0(l.code),l.message||"")||null)}else if("documentChange"in t){t.documentChange;let n=t.documentChange;n.document,n.document.name,n.document.updateTime;let i=ry(e,n.document.name),s=rd(n.document.updateTime),a=n.document.createTime?rd(n.document.createTime):F.min(),o=new eB({mapValue:{fields:n.document.fields}}),l=e$.newFoundDocument(i,s,a,o);r=new t6(n.targetIds||[],n.removedTargetIds||[],l.key,l)}else if("documentDelete"in t){t.documentDelete;let n=t.documentDelete;n.document;let i=ry(e,n.document),s=n.readTime?rd(n.readTime):F.min(),a=e$.newNoDocument(i,s);r=new t6([],n.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let n=t.documentRemove;n.document;let i=ry(e,n.document);r=new t6([],n.removedTargetIds||[],i,null)}else{if(!("filter"in t))return T();{t.filter;let e=t.filter;e.targetId;let{count:n=0,unchangedNames:i}=e,s=new tZ(n,i);r=new t7(e.targetId,s)}}return r}(this.serializer,e),r=function(e){if(!("targetChange"in e))return F.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?F.min():t.readTime?rd(t.readTime):F.min()}(e);return this.listener.u_(t,r)}c_(e){let t={};t.database=rv(this.serializer),t.addTarget=function(e,t){let r;let n=t.target;if((r=te(n)?{documents:{documents:[rw(e,n.path)]}}:{query:function(e,t){var r,n;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=rw(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof eW?function(e){if("=="===e.op){if(eP(e.value))return{unaryFilter:{field:rT(e.field),op:"IS_NAN"}};if(eM(e.value))return{unaryFilter:{field:rT(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(eP(e.value))return{unaryFilter:{field:rT(e.field),op:"IS_NOT_NAN"}};if(eM(e.value))return{unaryFilter:{field:rT(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:rT(e.field),op:ra[e.op],value:e.value}}}(t):t instanceof eH?function(t){let r=t.getFilters().map(t=>e(t));return 1===r.length?r[0]:{compositeFilter:{op:ro[t.op],filters:r}}}(t):T()}(eH.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:rT(e.field),direction:rs[e.dir]}))}(t.orderBy);l&&(s.structuredQuery.orderBy=l);let u=ru(e,t.limit);return null!==u&&(s.structuredQuery.limit=u),t.startAt&&(s.structuredQuery.startAt={before:(r=t.startAt).inclusive,values:r.position}),t.endAt&&(s.structuredQuery.endAt={before:!(n=t.endAt).inclusive,values:n.position}),{ut:s,parent:i}}(e,n).ut}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){r.resumeToken=rc(e,t.resumeToken);let n=ru(e,t.expectedCount);null!==n&&(r.expectedCount=n)}else if(t.snapshotVersion.compareTo(F.min())>0){r.readTime=rh(e,t.snapshotVersion.toTimestamp());let n=ru(e,t.expectedCount);null!==n&&(r.expectedCount=n)}return r}(this.serializer,e);let r=function(e,t){let r=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return T()}}(t.purpose);return null==r?null:{"goog-listen-tags":r}}(this.serializer,e);r&&(t.labels=r),this.t_(t)}l_(e){let t={};t.database=rv(this.serializer),t.removeTarget=e,this.t_(t)}}class ns extends nn{constructor(e,t,r,n,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,n,s),this.serializer=i,this.h_=!1}get P_(){return this.h_}start(){this.h_=!1,this.lastStreamToken=void 0,super.start()}i_(){this.h_&&this.I_([])}a_(e,t){return this.connection.Fo("Write",e,t)}onMessage(e){var t,r;if(e.streamToken||T(),this.lastStreamToken=e.streamToken,this.h_){this.jo.reset();let n=(t=e.writeResults,r=e.commitTime,t&&t.length>0?(void 0!==r||T(),t.map(e=>{let t;return(t=e.updateTime?rd(e.updateTime):rd(r)).isEqual(F.min())&&(t=rd(r)),new tM(t,e.transformResults||[])})):[]),i=rd(e.commitTime);return this.listener.T_(i,n)}return e.writeResults&&0!==e.writeResults.length&&T(),this.h_=!0,this.listener.E_()}d_(){let e={};e.database=rv(this.serializer),this.t_(e)}I_(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var r;let n;if(t instanceof tz)n={update:rE(e,t.key,t.value)};else if(t instanceof tW)n={delete:rg(e,t.key)};else if(t instanceof tK)n={update:rE(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof tH))return T();n={verify:rg(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let r=t.transform;if(r instanceof tD)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(r instanceof tA)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:r.elements}};if(r instanceof tk)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:r.elements}};if(r instanceof tR)return{fieldPath:t.field.canonicalString(),increment:r.Ie};throw T()})(0,e))),t.precondition.isNone||(n.currentDocument=void 0!==(r=t.precondition).updateTime?{updateTime:rh(e,r.updateTime.toTimestamp())}:void 0!==r.exists?{exists:r.exists}:T()),n})(this.serializer,e))};this.t_(t)}}/**
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
 */class na extends class{}{constructor(e,t,r,n){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=n,this.A_=!1}R_(){if(this.A_)throw new S(I.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,r,n){return this.R_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.So(e,rm(t,r),n,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===I.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new S(I.UNKNOWN,e.toString())})}vo(e,t,r,n,i){return this.R_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.vo(e,rm(t,r),n,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===I.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new S(I.UNKNOWN,e.toString())})}terminate(){this.A_=!0,this.connection.terminate()}}class no{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.m_=0,this.f_=null,this.g_=!0}p_(){0===this.m_&&(this.y_("Unknown"),this.f_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.f_=null,this.w_("Backend didn't respond within 10 seconds."),this.y_("Offline"),Promise.resolve())))}S_(e){"Online"===this.state?this.y_("Unknown"):(this.m_++,this.m_>=1&&(this.b_(),this.w_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.y_("Offline")))}set(e){this.b_(),this.m_=0,"Online"===e&&(this.g_=!1),this.y_(e)}y_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}w_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.g_?(v(t),this.g_=!1):w("OnlineStateTracker",t)}b_(){null!==this.f_&&(this.f_.cancel(),this.f_=null)}}/**
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
 */class nl{constructor(e,t,r,n,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.D_=[],this.C_=new Map,this.v_=new Set,this.F_=[],this.M_=i,this.M_.io(e=>{r.enqueueAndForget(async()=>{ny(this)&&(w("RemoteStore","Restarting streams for network reachability change."),await async function(e){e.v_.add(4),await nh(e),e.x_.set("Unknown"),e.v_.delete(4),await nu(e)}(this))})}),this.x_=new no(r,n)}}async function nu(e){if(ny(e))for(let t of e.F_)await t(!0)}async function nh(e){for(let t of e.F_)await t(!1)}function nc(e,t){e.C_.has(t.targetId)||(e.C_.set(t.targetId,t),ng(e)?np(e):nR(e).Jo()&&nf(e,t))}function nd(e,t){let r=nR(e);e.C_.delete(t),r.Jo()&&nm(e,t),0===e.C_.size&&(r.Jo()?r.Xo():ny(e)&&e.x_.set("Unknown"))}function nf(e,t){if(e.O_.Oe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(F.min())>0){let r=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(r)}nR(e).c_(t)}function nm(e,t){e.O_.Oe(t),nR(e).l_(t)}function np(e){e.O_=new rr({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),_t:t=>e.C_.get(t)||null,nt:()=>e.datastore.serializer.databaseId}),nR(e).start(),e.x_.p_()}function ng(e){return ny(e)&&!nR(e).Ho()&&e.C_.size>0}function ny(e){return 0===e.v_.size}async function nw(e){e.C_.forEach((t,r)=>{nf(e,t)})}async function nv(e,t){e.O_=void 0,ng(e)?(e.x_.S_(t),np(e)):e.x_.set("Unknown")}async function n_(e,t,r){if(e.x_.set("Online"),t instanceof re&&2===t.state&&t.cause)try{await async function(e,t){let r=t.cause;for(let n of t.targetIds)e.C_.has(n)&&(await e.remoteSyncer.rejectListen(n,r),e.C_.delete(n),e.O_.removeTarget(n))}(e,t)}catch(r){w("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await nE(e,r)}else if(t instanceof t6?e.O_.$e(t):t instanceof t7?e.O_.Je(t):e.O_.Ge(t),!r.isEqual(F.min()))try{let t=await rJ(e.localStore);r.compareTo(t)>=0&&await function(e,t){let r=e.O_.it(t);return r.targetChanges.forEach((r,n)=>{if(r.resumeToken.approximateByteSize()>0){let i=e.C_.get(n);i&&e.C_.set(n,i.withResumeToken(r.resumeToken,t))}}),r.targetMismatches.forEach((t,r)=>{let n=e.C_.get(t);if(!n)return;e.C_.set(t,n.withResumeToken(eg.EMPTY_BYTE_STRING,n.snapshotVersion)),nm(e,t);let i=new rC(n.target,t,r,n.sequenceNumber);nf(e,i)}),e.remoteSyncer.applyRemoteEvent(r)}(e,r)}catch(t){w("RemoteStore","Failed to raise snapshot:",t),await nE(e,t)}}async function nE(e,t,r){if(!Z(t))throw t;e.v_.add(1),await nh(e),e.x_.set("Offline"),r||(r=()=>rJ(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{w("RemoteStore","Retrying IndexedDB access"),await r(),e.v_.delete(1),await nu(e)})}function nT(e,t){return t().catch(r=>nE(e,r,t))}async function nI(e){let t=nL(e),r=e.D_.length>0?e.D_[e.D_.length-1].batchId:-1;for(;ny(e)&&e.D_.length<10;)try{let n=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}(e.localStore,r);if(null===n){0===e.D_.length&&t.Xo();break}r=n.batchId,function(e,t){e.D_.push(t);let r=nL(e);r.Jo()&&r.P_&&r.I_(t.mutations)}(e,n)}catch(t){await nE(e,t)}nS(e)&&nC(e)}function nS(e){return ny(e)&&!nL(e).Ho()&&e.D_.length>0}function nC(e){nL(e).start()}async function nb(e){nL(e).d_()}async function nD(e){let t=nL(e);for(let r of e.D_)t.I_(r.mutations)}async function nA(e,t,r){let n=e.D_.shift(),i=tJ.from(n,t,r);await nT(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await nI(e)}async function nN(e,t){t&&nL(e).P_&&await async function(e,t){var r;if(function(e){switch(e){default:return T();case I.CANCELLED:case I.UNKNOWN:case I.DEADLINE_EXCEEDED:case I.RESOURCE_EXHAUSTED:case I.INTERNAL:case I.UNAVAILABLE:case I.UNAUTHENTICATED:return!1;case I.INVALID_ARGUMENT:case I.NOT_FOUND:case I.ALREADY_EXISTS:case I.PERMISSION_DENIED:case I.FAILED_PRECONDITION:case I.ABORTED:case I.OUT_OF_RANGE:case I.UNIMPLEMENTED:case I.DATA_LOSS:return!0}}(r=t.code)&&r!==I.ABORTED){let r=e.D_.shift();nL(e).Zo(),await nT(e,()=>e.remoteSyncer.rejectFailedWrite(r.batchId,t)),await nI(e)}}(e,t),nS(e)&&nC(e)}async function nk(e,t){e.asyncQueue.verifyOperationInProgress(),w("RemoteStore","RemoteStore received new credentials");let r=ny(e);e.v_.add(3),await nh(e),r&&e.x_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.v_.delete(3),await nu(e)}async function nx(e,t){t?(e.v_.delete(2),await nu(e)):t||(e.v_.add(2),await nh(e),e.x_.set("Unknown"))}function nR(e){var t,r,n;return e.N_||(e.N_=(t=e.datastore,r=e.asyncQueue,n={Po:nw.bind(null,e),To:nv.bind(null,e),u_:n_.bind(null,e)},t.R_(),new ni(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.F_.push(async t=>{t?(e.N_.Zo(),ng(e)?np(e):e.x_.set("Unknown")):(await e.N_.stop(),e.O_=void 0)})),e.N_}function nL(e){var t,r,n;return e.L_||(e.L_=(t=e.datastore,r=e.asyncQueue,n={Po:nb.bind(null,e),To:nN.bind(null,e),E_:nD.bind(null,e),T_:nA.bind(null,e)},t.R_(),new ns(r,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,n)),e.F_.push(async t=>{t?(e.L_.Zo(),await nI(e)):(await e.L_.stop(),e.D_.length>0&&(w("RemoteStore",`Stopping write stream with ${e.D_.length} pending writes`),e.D_=[]))})),e.L_}/**
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
 */class nV{constructor(e,t,r,n,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=n,this.removalCallback=i,this.deferred=new C,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,n,i){let s=new nV(e,t,Date.now()+r,n,i);return s.start(r),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new S(I.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nO(e,t){if(v("AsyncQueue",`${t}: ${e}`),Z(e))return new S(I.UNAVAILABLE,`${t}: ${e}`);throw e}/**
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
 */class nM{constructor(e){this.comparator=e?(t,r)=>e(t,r)||z.comparator(t.key,r.key):(e,t)=>z.comparator(e.key,t.key),this.keyedMap=tg(),this.sortedSet=new eu(this.comparator)}static emptySet(e){return new nM(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof nM)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,n=r.getNext().key;if(!e.isEqual(n))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new nM;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class nP{constructor(){this.B_=new eu(z.comparator)}track(e){let t=e.doc.key,r=this.B_.get(t);r?0!==e.type&&3===r.type?this.B_=this.B_.insert(t,e):3===e.type&&1!==r.type?this.B_=this.B_.insert(t,{type:r.type,doc:e.doc}):2===e.type&&2===r.type?this.B_=this.B_.insert(t,{type:2,doc:e.doc}):2===e.type&&0===r.type?this.B_=this.B_.insert(t,{type:0,doc:e.doc}):1===e.type&&0===r.type?this.B_=this.B_.remove(t):1===e.type&&2===r.type?this.B_=this.B_.insert(t,{type:1,doc:r.doc}):0===e.type&&1===r.type?this.B_=this.B_.insert(t,{type:2,doc:e.doc}):T():this.B_=this.B_.insert(t,e)}k_(){let e=[];return this.B_.inorderTraversal((t,r)=>{e.push(r)}),e}}class nF{constructor(e,t,r,n,i,s,a,o,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=n,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,n,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new nF(e,t,nM.emptySet(t),s,r,n,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&tl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==r[e].type||!t[e].doc.isEqual(r[e].doc))return!1;return!0}}/**
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
 */class nU{constructor(){this.q_=void 0,this.Q_=[]}K_(){return this.Q_.some(e=>e.U_())}}class nq{constructor(){this.queries=new tf(e=>tu(e),tl),this.onlineState="Unknown",this.W_=new Set}}async function nB(e,t){let r=3,n=t.query,i=e.queries.get(n);i?!i.K_()&&t.U_()&&(r=2):(i=new nU,r=t.U_()?0:1);try{switch(r){case 0:i.q_=await e.onListen(n,!0);break;case 1:i.q_=await e.onListen(n,!1);break;case 2:await e.onFirstRemoteStoreListen(n)}}catch(r){let e=nO(r,`Initialization of query '${th(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,i),i.Q_.push(t),t.G_(e.onlineState),i.q_&&t.z_(i.q_)&&nQ(e)}async function n$(e,t){let r=t.query,n=3,i=e.queries.get(r);if(i){let e=i.Q_.indexOf(t);e>=0&&(i.Q_.splice(e,1),0===i.Q_.length?n=t.U_()?0:1:!i.K_()&&t.U_()&&(n=2))}switch(n){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function nz(e,t){let r=!1;for(let n of t){let t=n.query,i=e.queries.get(t);if(i){for(let e of i.Q_)e.z_(n)&&(r=!0);i.q_=n}}r&&nQ(e)}function nK(e,t,r){let n=e.queries.get(t);if(n)for(let e of n.Q_)e.onError(r);e.queries.delete(t)}function nQ(e){e.W_.forEach(e=>{e.next()})}(a=s||(s={})).j_="default",a.Cache="cache";class nG{constructor(e,t,r){this.query=e,this.H_=t,this.J_=!1,this.Y_=null,this.onlineState="Unknown",this.options=r||{}}z_(e){if(!this.options.includeMetadataChanges){let t=[];for(let r of e.docChanges)3!==r.type&&t.push(r);e=new nF(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.J_?this.Z_(e)&&(this.H_.next(e),t=!0):this.X_(e,this.onlineState)&&(this.ea(e),t=!0),this.Y_=e,t}onError(e){this.H_.error(e)}G_(e){this.onlineState=e;let t=!1;return this.Y_&&!this.J_&&this.X_(this.Y_,e)&&(this.ea(this.Y_),t=!0),t}X_(e,t){return!(e.fromCache&&this.U_())||(!this.options.ta||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Z_(e){if(e.docChanges.length>0)return!0;let t=this.Y_&&this.Y_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ea(e){e=nF.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.J_=!0,this.H_.next(e)}U_(){return this.options.source!==s.Cache}}/**
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
 */class nj{constructor(e){this.key=e}}class nW{constructor(e){this.key=e}}class nH{constructor(e,t){this.query=e,this.ua=t,this.ca=null,this.hasCachedResults=!1,this.current=!1,this.la=tE(),this.mutatedKeys=tE(),this.ha=td(e),this.Pa=new nM(this.ha)}get Ia(){return this.ua}Ta(e,t){let r=t?t.Ea:new nP,n=t?t.Pa:this.Pa,i=t?t.mutatedKeys:this.mutatedKeys,s=n,a=!1,o="F"===this.query.limitType&&n.size===this.query.limit?n.last():null,l="L"===this.query.limitType&&n.size===this.query.limit?n.first():null;if(e.inorderTraversal((e,t)=>{let u=n.get(e),h=tc(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(r.track({type:3,doc:h}),f=!0):this.da(u,h)||(r.track({type:2,doc:h}),f=!0,(o&&this.ha(h,o)>0||l&&0>this.ha(h,l))&&(a=!0)):!u&&h?(r.track({type:0,doc:h}),f=!0):u&&!h&&(r.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(s=s.add(h),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),r.track({type:1,doc:e})}return{Pa:s,Ea:r,Xi:a,mutatedKeys:i}}da(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,n){let i=this.Pa;this.Pa=e.Pa,this.mutatedKeys=e.mutatedKeys;let s=e.Ea.k_();s.sort((e,t)=>(function(e,t){let r=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return T()}};return r(e)-r(t)})(e.type,t.type)||this.ha(e.doc,t.doc)),this.Aa(r),n=null!=n&&n;let a=t&&!n?this.Ra():[],o=0===this.la.size&&this.current&&!n?1:0,l=o!==this.ca;return(this.ca=o,0!==s.length||l)?{snapshot:new nF(this.query,e.Pa,i,s,e.mutatedKeys,0===o,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),Va:a}:{Va:a}}G_(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Pa:this.Pa,Ea:new nP,mutatedKeys:this.mutatedKeys,Xi:!1},!1)):{Va:[]}}ma(e){return!this.ua.has(e)&&!!this.Pa.has(e)&&!this.Pa.get(e).hasLocalMutations}Aa(e){e&&(e.addedDocuments.forEach(e=>this.ua=this.ua.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.ua=this.ua.delete(e)),this.current=e.current)}Ra(){if(!this.current)return[];let e=this.la;this.la=tE(),this.Pa.forEach(e=>{this.ma(e.key)&&(this.la=this.la.add(e.key))});let t=[];return e.forEach(e=>{this.la.has(e)||t.push(new nW(e))}),this.la.forEach(r=>{e.has(r)||t.push(new nj(r))}),t}fa(e){this.ua=e.hs,this.la=tE();let t=this.Ta(e.documents);return this.applyChanges(t,!0)}ga(){return nF.fromInitialDocuments(this.query,this.Pa,this.mutatedKeys,0===this.ca,this.hasCachedResults)}}class nY{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class nJ{constructor(e){this.key=e,this.pa=!1}}class nX{constructor(e,t,r,n,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=n,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.ya={},this.wa=new tf(e=>tu(e),tl),this.Sa=new Map,this.ba=new Set,this.Da=new eu(z.comparator),this.Ca=new Map,this.va=new rP,this.Fa={},this.Ma=new Map,this.xa=rx.Ln(),this.onlineState="Unknown",this.Oa=void 0}get isPrimaryClient(){return!0===this.Oa}}async function nZ(e,t,r=!0){let n;let i=ic(e),s=i.wa.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),n=s.view.ga()):n=await n1(i,t,r,!0),n}async function n0(e,t){let r=ic(e);await n1(r,t,!0,!1)}async function n1(e,t,r,n){var i,s;let a;let o=await (i=e.localStore,s=ts(t),i.persistence.runTransaction("Allocate target","readwrite",e=>{let t;return i.Qr.getTargetData(e,s).next(r=>r?(t=r,W.resolve(t)):i.Qr.allocateTargetId(e).next(r=>(t=new rC(s,r,"TargetPurposeListen",e.currentSequenceNumber),i.Qr.addTargetData(e,t).next(()=>t))))}).then(e=>{let t=i.ns.get(e.targetId);return(null===t||e.snapshotVersion.compareTo(t.snapshotVersion)>0)&&(i.ns=i.ns.insert(e.targetId,e),i.rs.set(s,e.targetId)),e})),l=o.targetId,u=r?e.sharedClientState.addLocalQueryTarget(l):"not-current";return n&&(a=await n2(e,t,l,"current"===u,o.resumeToken)),e.isPrimaryClient&&r&&nc(e.remoteStore,o),a}async function n2(e,t,r,n,i){e.Na=(t,r,n)=>(async function(e,t,r,n){let i=t.view.Ta(r);i.Xi&&(i=await rZ(e.localStore,t.query,!1).then(({documents:e})=>t.view.Ta(e,i)));let s=n&&n.targetChanges.get(t.targetId),a=n&&null!=n.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return ia(e,t.targetId,o.Va),o.snapshot})(e,t,r,n);let s=await rZ(e.localStore,t,!0),a=new nH(t,s.hs),o=a.Ta(s.documents),l=t5.createSynthesizedTargetChangeForCurrentChange(r,n&&"Offline"!==e.onlineState,i),u=a.applyChanges(o,e.isPrimaryClient,l);ia(e,r,u.Va);let h=new nY(t,r,a);return e.wa.set(t,h),e.Sa.has(r)?e.Sa.get(r).push(t):e.Sa.set(r,[t]),u.snapshot}async function n4(e,t,r){let n=e.wa.get(t),i=e.Sa.get(n.targetId);if(i.length>1)return e.Sa.set(n.targetId,i.filter(e=>!tl(e,t))),void e.wa.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await rX(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),r&&nd(e.remoteStore,n.targetId),ii(e,n.targetId)}).catch(j)):(ii(e,n.targetId),await rX(e.localStore,n.targetId,!0))}async function n9(e,t){let r=e.wa.get(t),n=e.Sa.get(r.targetId);e.isPrimaryClient&&1===n.length&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),nd(e.remoteStore,r.targetId))}async function n3(e,t,r){var n;let i=(e.remoteStore.remoteSyncer.applySuccessfulWrite=n7.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ie.bind(null,e),e);try{let e;let s=await function(e,t){let r,n;let i=P.now(),s=t.reduce((e,t)=>e.add(t.key),tE());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=tm,l=tE();return e.os.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(n=>{r=n;let s=[];for(let e of t){let t=function(e,t){let r=null;for(let n of e.fieldTransforms){let e=t.data.field(n.field),i=tb(n.transform,e||null);null!=i&&(null===r&&(r=eB.empty()),r.set(n.field,i))}return r||null}(e,r.get(e.key).overlayedDocument);null!=t&&s.push(new tK(e.key,t,function e(t){let r=[];return eo(t.fields,(t,n)=>{let i=new $([t]);if(eF(n)){let t=e(n.mapValue).fields;if(0===t.length)r.push(i);else for(let e of t)r.push(i.child(e))}else r.push(i)}),new em(r)}(t.value.mapValue),tP.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{n=t;let i=t.applyToLocalDocumentSet(r,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:n.batchId,changes:ty(r)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),n=s.batchId,(e=i.Fa[i.currentUser.toKey()])||(e=new eu(O)),e=e.insert(n,r),i.Fa[i.currentUser.toKey()]=e,await il(i,s.changes),await nI(i.remoteStore)}catch(t){let e=nO(t,"Failed to persist write");r.reject(e)}}async function n8(e,t){try{let r=await function(e,t){let r=t.snapshotVersion,n=e.ns;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{var s;let a,o;let l=e.os.newChangeBuffer({trackRemovals:!0});n=e.ns;let u=[];t.targetChanges.forEach((s,a)=>{var o;let l=n.get(a);if(!l)return;u.push(e.Qr.removeMatchingKeys(i,s.removedDocuments,a).next(()=>e.Qr.addMatchingKeys(i,s.addedDocuments,a)));let h=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(a)?h=h.withResumeToken(eg.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):s.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(s.resumeToken,r)),n=n.insert(a,h),o=h,(0===l.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&u.push(e.Qr.updateTargetData(i,h))});let h=tm,c=tE();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,r))}),u.push((s=t.documentUpdates,a=tE(),o=tE(),s.forEach(e=>a=a.add(e)),l.getEntries(i,a).next(e=>{let t=tm;return s.forEach((r,n)=>{let i=e.get(r);n.isFoundDocument()!==i.isFoundDocument()&&(o=o.add(r)),n.isNoDocument()&&n.version.isEqual(F.min())?(l.removeEntry(r,n.readTime),t=t.insert(r,n)):!i.isValidDocument()||n.version.compareTo(i.version)>0||0===n.version.compareTo(i.version)&&i.hasPendingWrites?(l.addEntry(n),t=t.insert(r,n)):w("LocalStore","Ignoring outdated watch update for ",r,". Current version:",i.version," Watch version:",n.version)}),{cs:t,ls:o}})).next(e=>{h=e.cs,c=e.ls})),!r.isEqual(F.min())){let t=e.Qr.getLastRemoteSnapshotVersion(i).next(t=>e.Qr.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(t)}return W.waitFor(u).next(()=>l.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,h,c)).next(()=>h)}).then(t=>(e.ns=n,t))}(e.localStore,t);t.targetChanges.forEach((t,r)=>{let n=e.Ca.get(r);n&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||T(),t.addedDocuments.size>0?n.pa=!0:t.modifiedDocuments.size>0?n.pa||T():t.removedDocuments.size>0&&(n.pa||T(),n.pa=!1))}),await il(e,r,t)}catch(e){await j(e)}}function n5(e,t,r){var n;if(e.isPrimaryClient&&0===r||!e.isPrimaryClient&&1===r){let r;let i=[];e.wa.forEach((e,r)=>{let n=r.view.G_(t);n.snapshot&&i.push(n.snapshot)}),(n=e.eventManager).onlineState=t,r=!1,n.queries.forEach((e,n)=>{for(let e of n.Q_)e.G_(t)&&(r=!0)}),r&&nQ(n),i.length&&e.ya.u_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function n6(e,t,r){e.sharedClientState.updateQueryState(t,"rejected",r);let n=e.Ca.get(t),i=n&&n.key;if(i){let r=new eu(z.comparator);r=r.insert(i,e$.newNoDocument(i,F.min()));let n=tE().add(i),s=new t8(F.min(),new Map,new eu(O),r,n);await n8(e,s),e.Da=e.Da.remove(i),e.Ca.delete(t),io(e)}else await rX(e.localStore,t,!1).then(()=>ii(e,t,r)).catch(j)}async function n7(e,t){var r;let n=t.batch.batchId;try{let i=await (r=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let n=t.batch.keys(),i=r.os.newChangeBuffer({trackRemovals:!0});return(function(e,t,r,n){let i=r.batch,s=i.keys(),a=W.resolve();return s.forEach(e=>{a=a.next(()=>n.getEntry(t,e)).next(t=>{let s=r.docVersions.get(e);null!==s||T(),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,r),t.isValidDocument()&&(t.setReadTime(r.commitVersion),n.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(r,e,t,i).next(()=>i.apply(e)).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t.batch.batchId)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tE();for(let r=0;r<e.mutationResults.length;++r)e.mutationResults[r].transformResults.length>0&&(t=t.add(e.batch.mutations[r].key));return t}(t))).next(()=>r.localDocuments.getDocuments(e,n))});ir(e,n,null),it(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await il(e,i)}catch(e){await j(e)}}async function ie(e,t,r){var n;try{let i=await (n=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||T(),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))});ir(e,t,r),it(e,t),e.sharedClientState.updateMutationState(t,"rejected",r),await il(e,i)}catch(e){await j(e)}}function it(e,t){(e.Ma.get(t)||[]).forEach(e=>{e.resolve()}),e.Ma.delete(t)}function ir(e,t,r){let n=e.Fa[e.currentUser.toKey()];if(n){let i=n.get(t);i&&(r?i.reject(r):i.resolve(),n=n.remove(t)),e.Fa[e.currentUser.toKey()]=n}}function ii(e,t,r=null){for(let n of(e.sharedClientState.removeLocalQueryTarget(t),e.Sa.get(t)))e.wa.delete(n),r&&e.ya.La(n,r);e.Sa.delete(t),e.isPrimaryClient&&e.va.Vr(t).forEach(t=>{e.va.containsKey(t)||is(e,t)})}function is(e,t){e.ba.delete(t.path.canonicalString());let r=e.Da.get(t);null!==r&&(nd(e.remoteStore,r),e.Da=e.Da.remove(t),e.Ca.delete(r),io(e))}function ia(e,t,r){for(let n of r)n instanceof nj?(e.va.addReference(n.key,t),function(e,t){let r=t.key,n=r.path.canonicalString();e.Da.get(r)||e.ba.has(n)||(w("SyncEngine","New document in limbo: "+r),e.ba.add(n),io(e))}(e,n)):n instanceof nW?(w("SyncEngine","Document no longer in limbo: "+n.key),e.va.removeReference(n.key,t),e.va.containsKey(n.key)||is(e,n.key)):T()}function io(e){for(;e.ba.size>0&&e.Da.size<e.maxConcurrentLimboResolutions;){let t=e.ba.values().next().value;e.ba.delete(t);let r=new z(q.fromString(t)),n=e.xa.next();e.Ca.set(n,new nJ(r)),e.Da=e.Da.insert(r,n),nc(e.remoteStore,new rC(ts(new tt(r.path)),n,"TargetPurposeLimboResolution",ei._e))}}async function il(e,t,r){let n=[],i=[],s=[];e.wa.isEmpty()||(e.wa.forEach((a,o)=>{s.push(e.Na(o,t,r).then(t=>{if((t||r)&&e.isPrimaryClient&&e.sharedClientState.updateQueryState(o.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){n.push(t);let e=rG.Ki(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.ya.u_(n),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",r=>W.forEach(t,t=>W.forEach(t.qi,n=>e.persistence.referenceDelegate.addReference(r,t.targetId,n)).next(()=>W.forEach(t.Qi,n=>e.persistence.referenceDelegate.removeReference(r,t.targetId,n)))))}catch(e){if(!Z(e))throw e;w("LocalStore","Failed to update sequence numbers: "+e)}for(let r of t){let t=r.targetId;if(!r.fromCache){let r=e.ns.get(t),n=r.snapshotVersion,i=r.withLastLimboFreeSnapshotVersion(n);e.ns=e.ns.insert(t,i)}}}(e.localStore,i))}async function iu(e,t){if(!e.currentUser.isEqual(t)){w("SyncEngine","User change. New user:",t.toKey());let r=await rY(e.localStore,t);e.currentUser=t,e.Ma.forEach(e=>{e.forEach(e=>{e.reject(new S(I.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),e.Ma.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await il(e,r.us)}}function ih(e,t){let r=e.Ca.get(t);if(r&&r.pa)return tE().add(r.key);{let r=tE(),n=e.Sa.get(t);if(!n)return r;for(let t of n){let n=e.wa.get(t);r=r.unionWith(n.view.Ia)}return r}}function ic(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=n8.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ih.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=n6.bind(null,e),e.ya.u_=nz.bind(null,e.eventManager),e.ya.La=nK.bind(null,e.eventManager),e}class id{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=nt(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){var t;return t=this.persistence,new rH(t,new rW,e.initialUser,this.serializer)}createPersistence(e){return new rz(rQ.Hr,this.serializer)}createSharedClientState(e){return new r1}async terminate(){var e,t;null===(e=this.gcScheduler)||void 0===e||e.stop(),null===(t=this.indexBackfillerScheduler)||void 0===t||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class im{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>n5(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=iu.bind(null,this.syncEngine),await nx(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new nq}createDatastore(e){let t=nt(e.databaseInfo.databaseId),r=new r7(e.databaseInfo);return new na(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){var t;return t=this.localStore,new nl(t,this.datastore,e.asyncQueue,e=>n5(this.syncEngine,e,0),r4.D()?new r4:new r2)}createSyncEngine(e,t){return function(e,t,r,n,i,s,a){let o=new nX(e,t,r,n,i,s);return a&&(o.Oa=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e;await async function(e){w("RemoteStore","RemoteStore shutting down."),e.v_.add(5),await nh(e),e.M_.shutdown(),e.x_.set("Unknown")}(this.remoteStore),null===(e=this.datastore)||void 0===e||e.terminate()}}/**
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
 */class ip{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.qa(this.observer.next,e)}error(e){this.observer.error?this.qa(this.observer.error,e):v("Uncaught Error in snapshot listener:",e.toString())}Qa(){this.muted=!0}qa(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class ig{constructor(e,t,r,n){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=n,this.user=m.UNAUTHENTICATED,this.clientId=V.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async e=>{w("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(r,e=>(w("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new S(I.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new C;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(r){let t=nO(r,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function iy(e,t){e.asyncQueue.verifyOperationInProgress(),w("FirestoreClient","Initializing OfflineComponentProvider");let r=e.configuration;await t.initialize(r);let n=r.initialUser;e.setCredentialChangeListener(async e=>{n.isEqual(e)||(await rY(t.localStore,e),n=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function iw(e,t){e.asyncQueue.verifyOperationInProgress();let r=await iv(e);w("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(r,e.configuration),e.setCredentialChangeListener(e=>nk(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,r)=>nk(t.remoteStore,r)),e._onlineComponents=t}async function iv(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){w("FirestoreClient","Using user provided OfflineComponentProvider");try{await iy(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===I.FAILED_PRECONDITION||t.code===I.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;_("Error using user provided cache. Falling back to memory cache: "+t),await iy(e,new id)}}else w("FirestoreClient","Using default OfflineComponentProvider"),await iy(e,new id)}return e._offlineComponents}async function i_(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(w("FirestoreClient","Using user provided OnlineComponentProvider"),await iw(e,e._uninitializedComponentsProvider._online)):(w("FirestoreClient","Using default OnlineComponentProvider"),await iw(e,new im))),e._onlineComponents}async function iE(e){let t=await i_(e),r=t.eventManager;return r.onListen=nZ.bind(null,t.syncEngine),r.onUnlisten=n4.bind(null,t.syncEngine),r.onFirstRemoteStoreListen=n0.bind(null,t.syncEngine),r.onLastRemoteStoreUnlisten=n9.bind(null,t.syncEngine),r}/**
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
 */function iT(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
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
 */let iI=new Map;/**
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
 */function iS(e,t,r){if(!r)throw new S(I.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function iC(e){if(!z.isDocumentKey(e))throw new S(I.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ib(e){if(z.isDocumentKey(e))throw new S(I.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function iD(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let r=(t=e).constructor?t.constructor.name:null;return r?`a custom ${r} object`:"an object"}}return"function"==typeof e?"a function":T()}function iA(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new S(I.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let r=iD(e);throw new S(I.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${r}`)}}return e}/**
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
 */class iN{constructor(e){var t,r;if(void 0===e.host){if(void 0!==e.ssl)throw new S(I.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new S(I.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,r,n){if(!0===t&&!0===n)throw new S(I.INVALID_ARGUMENT,`${e} and ${r} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=iT(null!==(r=e.experimentalLongPollingOptions)&&void 0!==r?r:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new S(I.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new S(I.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new S(I.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,r;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ik{constructor(e,t,r,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new iN({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new S(I.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new S(I.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new iN(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new D;switch(e.type){case"firstParty":return new x(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new S(I.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=iI.get(e);t&&(w("ComponentProvider","Removing Datastore"),iI.delete(e),t.terminate())}(this),Promise.resolve()}}/**
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
 */class ix{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ix(this.firestore,e,this._query)}}class iR{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new iL(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new iR(this.firestore,e,this._key)}}class iL extends ix{constructor(e,t,r){super(e,t,new tt(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new iR(this.firestore,null,new z(e))}withConverter(e){return new iL(this.firestore,e,this._path)}}function iV(e,t,...r){if(e=(0,h.m9)(e),iS("collection","path",t),e instanceof ik){let n=q.fromString(t,...r);return ib(n),new iL(e,null,n)}{if(!(e instanceof iR||e instanceof iL))throw new S(I.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(q.fromString(t,...r));return ib(n),new iL(e.firestore,null,n)}}function iO(e,t,...r){if(e=(0,h.m9)(e),1==arguments.length&&(t=V.newId()),iS("doc","path",t),e instanceof ik){let n=q.fromString(t,...r);return iC(n),new iR(e,null,new z(n))}{if(!(e instanceof iR||e instanceof iL))throw new S(I.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=e._path.child(q.fromString(t,...r));return iC(n),new iR(e.firestore,e instanceof iL?e.converter:null,new z(n))}}/**
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
 */class iM{constructor(){this.nu=Promise.resolve(),this.ru=[],this.iu=!1,this.su=[],this.ou=null,this._u=!1,this.au=!1,this.uu=[],this.jo=new nr(this,"async_queue_retry"),this.cu=()=>{let e=ne();e&&w("AsyncQueue","Visibility state changed to "+e.visibilityState),this.jo.Ko()};let e=ne();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.cu)}get isShuttingDown(){return this.iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.lu(),this.hu(e)}enterRestrictedMode(e){if(!this.iu){this.iu=!0,this.au=e||!1;let t=ne();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.cu)}}enqueue(e){if(this.lu(),this.iu)return new Promise(()=>{});let t=new C;return this.hu(()=>this.iu&&this.au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.ru.push(e),this.Pu()))}async Pu(){if(0!==this.ru.length){try{await this.ru[0](),this.ru.shift(),this.jo.reset()}catch(e){if(!Z(e))throw e;w("AsyncQueue","Operation failed with retryable error: "+e)}this.ru.length>0&&this.jo.qo(()=>this.Pu())}}hu(e){let t=this.nu.then(()=>(this._u=!0,e().catch(e=>{let t;throw this.ou=e,this._u=!1,v("INTERNAL UNHANDLED ERROR: ",(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t)),e}).then(e=>(this._u=!1,e))));return this.nu=t,t}enqueueAfterDelay(e,t,r){this.lu(),this.uu.indexOf(e)>-1&&(t=0);let n=nV.createAndSchedule(this,e,t,r,e=>this.Iu(e));return this.su.push(n),n}lu(){this.ou&&T()}verifyOperationInProgress(){}async Tu(){let e;do e=this.nu,await e;while(e!==this.nu)}Eu(e){for(let t of this.su)if(t.timerId===e)return!0;return!1}du(e){return this.Tu().then(()=>{for(let t of(this.su.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.su))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tu()})}Au(e){this.uu.push(e)}Iu(e){let t=this.su.indexOf(e);this.su.splice(t,1)}}class iP extends ik{constructor(e,t,r,n){super(e,t,r,n),this.type="firestore",this._queue=new iM,this._persistenceKey=(null==n?void 0:n.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||iq(this),this._firestoreClient.terminate()}}function iF(e,t){let r="object"==typeof e?e:(0,o.Mq)(),n=(0,o.qX)(r,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!n._initialized){let e=(0,h.P0)("firestore");e&&function(e,t,r,n={}){var i;let s=(e=iA(e,ik))._getSettings(),a=`${t}:${r}`;if("firestore.googleapis.com"!==s.host&&s.host!==a&&_("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),n.mockUserToken){let t,r;if("string"==typeof n.mockUserToken)t=n.mockUserToken,r=m.MOCK_USER;else{t=(0,h.Sg)(n.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);let s=n.mockUserToken.sub||n.mockUserToken.user_id;if(!s)throw new S(I.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");r=new m(s)}e._authCredentials=new A(new b(t,r))}}(n,...e)}return n}function iU(e){return e._firestoreClient||iq(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function iq(e){var t,r,n,i;let s=e._freezeSettings(),a=(i=e._databaseId,new eS(i,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,iT(s.experimentalLongPollingOptions),s.useFetchStreams));e._firestoreClient=new ig(e._authCredentials,e._appCheckCredentials,e._queue,a),(null===(r=s.localCache)||void 0===r?void 0:r._offlineComponentProvider)&&(null===(n=s.localCache)||void 0===n?void 0:n._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.localCache.kind,_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider})}/**
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
 */class iB{constructor(e){this._byteString=e}static fromBase64String(e){try{return new iB(eg.fromBase64String(e))}catch(e){throw new S(I.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new iB(eg.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class i${constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new S(I.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new $(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class iz{constructor(e){this._methodName=e}}/**
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
 */class iK{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new S(I.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new S(I.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return O(this._lat,e._lat)||O(this._long,e._long)}}/**
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
 */let iQ=/^__.*__$/;class iG{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return null!==this.fieldMask?new tK(e,this.data,this.fieldMask,t,this.fieldTransforms):new tz(e,this.data,t,this.fieldTransforms)}}class ij{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new tK(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function iW(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw T()}}class iH{constructor(e,t,r,n,i,s){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=n,void 0===i&&this.Ru(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Vu(){return this.settings.Vu}mu(e){return new iH(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}fu(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.mu({path:r,gu:!1});return n.pu(e),n}yu(e){var t;let r=null===(t=this.path)||void 0===t?void 0:t.child(e),n=this.mu({path:r,gu:!1});return n.Ru(),n}wu(e){return this.mu({path:void 0,gu:!0})}Su(e){return i5(e,this.settings.methodName,this.settings.bu||!1,this.path,this.settings.Du)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Ru(){if(this.path)for(let e=0;e<this.path.length;e++)this.pu(this.path.get(e))}pu(e){if(0===e.length)throw this.Su("Document fields must not be empty");if(iW(this.Vu)&&iQ.test(e))throw this.Su('Document fields cannot begin and end with "__"')}}class iY{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||nt(e)}Cu(e,t,r,n=!1){return new iH({Vu:e,methodName:t,Du:r,path:$.emptyPath(),gu:!1,bu:n},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function iJ(e){let t=e._freezeSettings(),r=nt(e._databaseId);return new iY(e._databaseId,!!t.ignoreUndefinedProperties,r)}class iX extends iz{_toFieldTransform(e){if(2!==e.Vu)throw 1===e.Vu?e.Su(`${this._methodName}() can only appear at the top level of your update data`):e.Su(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof iX}}class iZ extends iz{_toFieldTransform(e){return new tO(e.path,new tD)}isEqual(e){return e instanceof iZ}}function i0(e,t){if(i2(e=(0,h.m9)(e)))return i4("Unsupported field value:",t,e),i1(e,t);if(e instanceof iz)return function(e,t){if(!iW(t.Vu))throw t.Su(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Su(`${e._methodName}() is not currently supported inside arrays`);let r=e._toFieldTransform(t);r&&t.fieldTransforms.push(r)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.gu&&4!==t.Vu)throw t.Su("Nested arrays are not supported");return function(e,t){let r=[],n=0;for(let i of e){let e=i0(i,t.wu(n));null==e&&(e={nullValue:"NULL_VALUE"}),r.push(e),n++}return{arrayValue:{values:r}}}(e,t)}return function(e,t){if(null===(e=(0,h.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e){var r,n,i;return r=t.serializer,"number"==typeof(i=n=e)&&Number.isInteger(i)&&!es(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER?tS(n):tI(r,n)}if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let r=P.fromDate(e);return{timestampValue:rh(t.serializer,r)}}if(e instanceof P){let r=new P(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rh(t.serializer,r)}}if(e instanceof iK)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof iB)return{bytesValue:rc(t.serializer,e._byteString)};if(e instanceof iR){let r=t.databaseId,n=e.firestore._databaseId;if(!n.isEqual(r))throw t.Su(`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:rf(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.Su(`Unsupported field value: ${iD(e)}`)}(e,t)}function i1(e,t){let r={};return el(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):eo(e,(e,n)=>{let i=i0(n,t.fu(e));null!=i&&(r[e]=i)}),{mapValue:{fields:r}}}function i2(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof P||e instanceof iK||e instanceof iB||e instanceof iR||e instanceof iz)}function i4(e,t,r){if(!i2(r)||!("object"==typeof r&&null!==r&&(Object.getPrototypeOf(r)===Object.prototype||null===Object.getPrototypeOf(r)))){let n=iD(r);throw"an object"===n?t.Su(e+" a custom object"):t.Su(e+" "+n)}}function i9(e,t,r){if((t=(0,h.m9)(t))instanceof i$)return t._internalPath;if("string"==typeof t)return i8(e,t);throw i5("Field path arguments must be of type string or ",e,!1,void 0,r)}let i3=RegExp("[~\\*/\\[\\]]");function i8(e,t,r){if(t.search(i3)>=0)throw i5(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,r);try{return new i$(...t.split("."))._internalPath}catch(n){throw i5(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,r)}}function i5(e,t,r,n,i){let s=n&&!n.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;r&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${n}`),a&&(l+=` in document ${i}`),l+=")"),new S(I.INVALID_ARGUMENT,o+e+l)}function i6(e,t){return e.some(e=>e.isEqual(t))}/**
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
 */class i7{constructor(e,t,r,n,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=n,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new iR(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new se(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(st("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class se extends i7{data(){return super.data()}}function st(e,t){return"string"==typeof t?i8(e,t):t instanceof i$?t._internalPath:t._delegate._internalPath}class sr{}class sn extends sr{}function si(e,t,...r){let n=[];for(let i of(t instanceof sr&&n.push(t),function(e){let t=e.filter(e=>e instanceof so).length,r=e.filter(e=>e instanceof ss).length;if(t>1||t>0&&r>0)throw new S(I.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n=n.concat(r)),n))e=i._apply(e);return e}class ss extends sn{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ss(e,t,r)}_apply(e){let t=this._parse(e);return sh(e._query,t),new ix(e.firestore,e.converter,ta(e._query,t))}_parse(e){let t=iJ(e.firestore);return function(e,t,r,n,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new S(I.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){su(a,s);let t=[];for(let r of a)t.push(sl(n,e,r));o={arrayValue:{values:t}}}else o=sl(n,e,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||su(a,s),o=function(e,t,r,n=!1){return i0(r,e.Cu(n?4:3,t))}(r,t,a,"in"===s||"not-in"===s);return eW.create(i,s,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function sa(e,t,r){let n=st("where",e);return ss._create(n,t,r)}class so extends sr{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new so(e,t)}_parse(e){let t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:eH.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let r=e;for(let e of t.getFlattenedFilters())sh(r,e),r=ta(r,e)}(e._query,t),new ix(e.firestore,e.converter,ta(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function sl(e,t,r){if("string"==typeof(r=(0,h.m9)(r))){if(""===r)throw new S(I.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!tn(t)&&-1!==r.indexOf("/"))throw new S(I.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);let n=t.path.child(q.fromString(r));if(!z.isDocumentKey(n))throw new S(I.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return eL(e,new z(n))}if(r instanceof iR)return eL(e,r._key);throw new S(I.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${iD(r)}.`)}function su(e,t){if(!Array.isArray(e)||0===e.length)throw new S(I.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function sh(e,t){let r=function(e,t){for(let r of e)for(let e of r.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==r)throw r===t.op?new S(I.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new S(I.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`)}class sc{convertValue(e,t="none"){switch(eD(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ev(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(e_(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw T()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return eo(e,(e,n)=>{r[e]=this.convertValue(n,t)}),r}convertGeoPoint(e){return new iK(ev(e.latitude),ev(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=eT(e);return null==r?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(eI(e));default:return null}}convertTimestamp(e){let t=ew(e);return new P(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=q.fromString(e);rS(r)||T();let n=new eC(r.get(1),r.get(3)),i=new z(r.popFirst(5));return n.isEqual(t)||v(`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */class sd{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class sf extends i7{constructor(e,t,r,n,i,s){super(e,t,r,n,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new sm(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(st("DocumentSnapshot.get",e));if(null!==r)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class sm extends sf{data(e={}){return super.data(e)}}class sp{constructor(e,t,r,n){this._firestore=e,this._userDataWriter=t,this._snapshot=n,this.metadata=new sd(n.hasPendingWrites,n.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new sm(this._firestore,this._userDataWriter,r.key,r,new sd(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new S(I.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(r=>{let n=new sm(e._firestore,e._userDataWriter,r.doc.key,r.doc,new sd(e._snapshot.mutatedKeys.has(r.doc.key),e._snapshot.fromCache),e.query.converter);return r.doc,{type:"added",doc:n,oldIndex:-1,newIndex:t++}})}{let r=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let n=new sm(e._firestore,e._userDataWriter,t.doc.key,t.doc,new sd(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),i=-1,s=-1;return 0!==t.type&&(i=r.indexOf(t.doc.key),r=r.delete(t.doc.key)),1!==t.type&&(s=(r=r.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return T()}}(t.type),doc:n,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}/**
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
 */function sg(e){e=iA(e,iR);let t=iA(e.firestore,iP);return(function(e,t,r={}){let n=new C;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new ip({next:s=>{t.enqueueAndForget(()=>n$(e,a));let o=s.docs.has(r);!o&&s.fromCache?i.reject(new S(I.UNAVAILABLE,"Failed to get document because the client is offline.")):o&&s.fromCache&&n&&"server"===n.source?i.reject(new S(I.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(s)},error:e=>i.reject(e)}),a=new nG(new tt(r.path),s,{includeMetadataChanges:!0,ta:!0});return nB(e,a)})(await iE(e),e.asyncQueue,t,r,n)),n.promise})(iU(t),e._key).then(r=>(function(e,t,r){let n=r.docs.get(t._key),i=new sy(e);return new sf(e,i,t._key,n,new sd(r.hasPendingWrites,r.fromCache),t.converter)})(t,e,r))}class sy extends sc{constructor(e){super(),this.firestore=e}convertBytes(e){return new iB(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new iR(this.firestore,null,t)}}function sw(e){e=iA(e,ix);let t=iA(e.firestore,iP),r=iU(t),n=new sy(t);return(/**
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
 */function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new S(I.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query),(function(e,t,r={}){let n=new C;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,r,n,i){let s=new nG(r,new ip({next:r=>{t.enqueueAndForget(()=>n$(e,s)),r.fromCache&&"server"===n.source?i.reject(new S(I.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(r)},error:e=>i.reject(e)}),{includeMetadataChanges:!0,ta:!0});return nB(e,s)})(await iE(e),e.asyncQueue,t,r,n)),n.promise})(r,e._query).then(r=>new sp(t,n,e,r)))}function sv(e,t,r){var n;e=iA(e,iR);let i=iA(e.firestore,iP),s=(n=e.converter)?r&&(r.merge||r.mergeFields)?n.toFirestore(t,r):n.toFirestore(t):t;return sE(i,[(function(e,t,r,n,i,s={}){let a,o;let l=e.Cu(s.merge||s.mergeFields?2:0,t,r,i);i4("Data must be an object, but it was:",l,n);let u=i1(n,l);if(s.merge)a=new em(l.fieldMask),o=l.fieldTransforms;else if(s.mergeFields){let e=[];for(let n of s.mergeFields){let i=i9(t,n,r);if(!l.contains(i))throw new S(I.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);i6(e,i)||e.push(i)}a=new em(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new iG(new eB(u),a,o)})(iJ(i),"setDoc",e._key,s,null!==e.converter,r).toMutation(e._key,tP.none())])}function s_(e,t,r,...n){e=iA(e,iR);let i=iA(e.firestore,iP),s=iJ(i);return sE(i,[("string"==typeof(t=(0,h.m9)(t))||t instanceof i$?function(e,t,r,n,i,s){let a=e.Cu(1,t,r),o=[i9(t,n,r)],l=[i];if(s.length%2!=0)throw new S(I.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(i9(t,s[e])),l.push(s[e+1]);let u=[],c=eB.empty();for(let e=o.length-1;e>=0;--e)if(!i6(u,o[e])){let t=o[e],r=l[e];r=(0,h.m9)(r);let n=a.yu(t);if(r instanceof iX)u.push(t);else{let e=i0(r,n);null!=e&&(u.push(t),c.set(t,e))}}return new ij(c,new em(u),a.fieldTransforms)}(s,"updateDoc",e._key,t,r,n):function(e,t,r,n){let i=e.Cu(1,t,r);i4("Data must be an object, but it was:",i,n);let s=[],a=eB.empty();return eo(n,(e,n)=>{let o=i8(t,e,r);n=(0,h.m9)(n);let l=i.yu(o);if(n instanceof iX)s.push(o);else{let e=i0(n,l);null!=e&&(s.push(o),a.set(o,e))}}),new ij(a,new em(s),i.fieldTransforms)}(s,"updateDoc",e._key,t)).toMutation(e._key,tP.exists(!0))])}function sE(e,t){return function(e,t){let r=new C;return e.asyncQueue.enqueueAndForget(async()=>n3(await i_(e).then(e=>e.syncEngine),t,r)),r.promise}(iU(e),t)}function sT(){return new iZ("serverTimestamp")}new WeakMap,function(e=!0){p=o.Jn,(0,o.Xd)(new l.wA("firestore",(t,{instanceIdentifier:r,options:n})=>{let i=t.getProvider("app").getImmediate(),s=new iP(new N(t.getProvider("auth-internal")),new L(t.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new S(I.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eC(e.options.projectId,t)}(i,r),i);return n=Object.assign({useFetchStreams:e},n),s._setSettings(n),s},"PUBLIC").setMultipleInstances(!0)),(0,o.KN)(f,"4.5.1",void 0),(0,o.KN)(f,"4.5.1","esm2017")}()}}]);