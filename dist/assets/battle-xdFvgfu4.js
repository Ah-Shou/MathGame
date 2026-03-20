import{l as f,n as k,b as w,r as O,f as Q,h as F,i as q,j as X,k as z,m as K,o as Y}from"./index-BQ5kTxv9.js";const j=5,E=5,$=1e4,I=10;function J(e,t){const r={addition:{name:"沙滩螃蟹",emoji:"🦀"},subtraction:{name:"森林精灵",emoji:"🧝"},multiplication:{name:"峡谷巨龙",emoji:"🐉"},division:{name:"洞穴蝙蝠",emoji:"🦇"},geometry:{name:"几何魔方",emoji:"🎲"},logic:{name:"迷宫幽灵",emoji:"👻"}}[e]??{name:"神秘怪物",emoji:"👾"};return{name:r.name,emoji:r.emoji,maxHp:E,currentHp:E,level:t}}function Z(e,t){return{islandId:e,monster:J(e,t),playerHp:j,playerMaxHp:j,currentQuestion:null,timeLeft:$,timeLimit:$,combo:0,score:0,questionsAnswered:0,questionsCorrect:0,startTime:Date.now(),totalTime:I*$,timeUsed:0,consecutiveWrong:0,difficulty:1,hadCombo:!1}}function ee(e){e.questionsAnswered++,e.questionsCorrect++,e.consecutiveWrong=0,e.combo++;const t=e.combo>0&&e.combo%3===0,s=t?2:1;return t&&(e.hadCombo=!0),e.monster.currentHp=Math.max(0,e.monster.currentHp-s),e.score+=t?20:10,e.questionsCorrect%3===0&&e.difficulty<3&&e.difficulty++,{damage:s,isCombo:t}}function te(e){e.questionsAnswered++,e.combo=0,e.consecutiveWrong++,e.playerHp=Math.max(0,e.playerHp-1),e.consecutiveWrong>=3&&e.difficulty>1&&(e.difficulty--,e.consecutiveWrong=0)}function se(e){e.questionsAnswered++,e.combo=0,e.consecutiveWrong++,e.playerHp=Math.max(0,e.playerHp-1)}function P(e){return e.playerHp<=0||e.monster.currentHp<=0||e.questionsAnswered>=I}function re(e){const s=(Date.now()-e.startTime)/e.totalTime;let r=1;e.playerHp>=e.playerMaxHp&&s<.6?r=3:e.playerHp>=2&&(r=2);const n=r*20+e.questionsCorrect*5,i=r*10+e.questionsCorrect*2;return{stars:r,xpGained:n,coinsGained:i,questionsCorrect:e.questionsCorrect,questionsTotal:e.questionsAnswered}}function o(e,t){return Math.floor(Math.random()*(t-e+1))+e}function B(e){let t,s;return e===1?(t=o(1,10),s=o(1,10)):e===2?(t=o(5,20),s=o(5,20)):(t=o(10,50),s=o(10,50)),{text:`${t} + ${s} = ?`,answer:t+s,operands:[t,s],operator:"+",difficulty:e}}function ne(e){let t,s;return e===1?(s=o(1,9),t=o(s,10)):e===2?(s=o(5,15),t=o(s,25)):(s=o(10,40),t=o(s,80)),{text:`${t} - ${s} = ?`,answer:t-s,operands:[t,s],operator:"-",difficulty:e}}function ie(e){let t,s;return e===1?(t=o(2,5),s=o(2,5)):e===2?(t=o(2,9),s=o(2,9)):(t=o(3,9),s=o(3,12)),{text:`${t} × ${s} = ?`,answer:t*s,operands:[t,s],operator:"×",difficulty:e}}function oe(e){let t,s;e===1?(t=o(2,5),s=o(1,5)):e===2?(t=o(2,9),s=o(1,9)):(t=o(3,9),s=o(2,12));const r=t*s;return{text:`${r} ÷ ${t} = ?`,answer:s,operands:[r,t],operator:"÷",difficulty:e}}function ae(e){return e===1?ce():e===2?Math.random()<.5?W():le():Math.random()<.5?de():W()}function ce(){const e=o(2,9),t=e*4;return{text:`正方形边长${e}，周长=?`,answer:t,operands:[e,4],operator:"?",difficulty:1}}function W(){const e=o(3,12),t=o(2,8),s=(e+t)*2;return{text:`长方形长${e}宽${t}，周长=?`,answer:s,operands:[e,t],operator:"?",difficulty:2}}function le(){const e=o(2,9),t=e*e;return{text:`正方形边长${e}，面积=?`,answer:t,operands:[e,e],operator:"?",difficulty:2}}function de(){const e=o(3,12),t=o(2,9),s=e*t;return{text:`长方形长${e}宽${t}，面积=?`,answer:s,operands:[e,t],operator:"?",difficulty:3}}function ue(e){return e===1?T(2,5,4):e===2?T(3,10,5):T(5,20,6)}function T(e,t,s){const r=o(e,t),n=o(1,10),i=Array.from({length:s},(u,v)=>n+v*r),a=o(1,s-1),c=i[a];return{text:`${i.map((u,v)=>v===a?"?":String(u)).join(", ")}`,answer:c,operands:[n,r],operator:"?",difficulty:1}}function C(e,t){const s=Math.max(1,Math.min(3,t));switch(e){case"addition":return B(s);case"subtraction":return ne(s);case"multiplication":return ie(s);case"division":return oe(s);case"geometry":return ae(s);case"logic":return ue(s);default:return B(s)}}let m=null;function pe(){return m||(m=new AudioContext),m}function l(e,t,s="sine",r=.3){try{const n=pe(),i=n.createOscillator(),a=n.createGain();i.connect(a),a.connect(n.destination),i.type=s,i.frequency.setValueAtTime(e,n.currentTime),a.gain.setValueAtTime(r,n.currentTime),a.gain.exponentialRampToValueAtTime(.001,n.currentTime+t),i.start(n.currentTime),i.stop(n.currentTime+t)}catch{}}function me(){l(523,.1),setTimeout(()=>l(659,.1),80),setTimeout(()=>l(784,.2),160)}function _(){l(200,.15,"sawtooth",.2),setTimeout(()=>l(150,.2,"sawtooth",.15),120)}function ve(){l(523,.08),setTimeout(()=>l(659,.08),60),setTimeout(()=>l(784,.08),120),setTimeout(()=>l(1047,.25),180)}function fe(){[523,659,784,1047].forEach((t,s)=>setTimeout(()=>l(t,.15),s*100))}function ye(){(m==null?void 0:m.state)==="suspended"&&m.resume()}let g=null;function p(){g!==null&&(clearInterval(g),g=null)}function he(e,t){p(),ye();const s=(t==null?void 0:t.islandId)??"addition",r=f();if(!r){k("home");return}const n=w(r,"hat"),i=w(r,"pet"),a=w(r,"skin"),c=Z(s,r.level);c.currentQuestion=C(s,c.difficulty),xe(e,c,r.avatar,r.nickname,(n==null?void 0:n.icon)??"",(n==null?void 0:n.id)??"",(i==null?void 0:i.icon)??"",(a==null?void 0:a.id)??""),S(e,c,s)}function xe(e,t,s,r,n,i,a,c){const y=t.currentQuestion;e.innerHTML=`
    <div class="battle-screen ${ke(c)}" id="battleScreen">
      <div class="battle-header">
        <button class="btn-back" id="backBtn">← 退出</button>
        <div class="battle-score">得分: <span id="scoreVal">${t.score}</span></div>
        <div class="battle-combo" id="comboDisplay" style="opacity:${t.combo>=3?1:0}">
          🔥 ${t.combo}连击
        </div>
      </div>

      <div class="battle-arena">
        <div class="arena-backdrop">
          <div class="arena-glow arena-glow-left"></div>
          <div class="arena-glow arena-glow-right"></div>
        </div>
        <div class="battle-fx-layer" id="battleFxLayer"></div>

        <div class="fighter-card monster-card">
          <div class="fighter-flash" id="monsterFlash"></div>
          <div class="fighter-badge">怪物</div>
          <div class="hp-bar-wrap fighter-hp-wrap">
            <div class="hp-bar monster-hp-bar">
              <div class="hp-fill monster-hp-fill" id="monsterHpFill"
                style="width:${t.monster.currentHp/t.monster.maxHp*100}%"></div>
            </div>
            <span class="hp-text" id="monsterHpText">${t.monster.currentHp}/${t.monster.maxHp}</span>
          </div>
          <div class="monster-side" id="monsterCard">
            <div class="monster-emoji" id="monsterEmoji">${t.monster.emoji}</div>
            <div class="monster-name">${t.monster.name}</div>
          </div>
        </div>

        <div class="vs-badge">VS</div>

        <div class="fighter-card player-card">
          <div class="fighter-flash" id="playerFlash"></div>
          <div class="fighter-badge">勇者</div>
          <div class="hp-bar-wrap fighter-hp-wrap">
            <div class="hp-bar player-hp-bar">
              <div class="hp-fill player-hp-fill" id="playerHpFill"
                style="width:${t.playerHp/t.playerMaxHp*100}%"></div>
            </div>
            <span class="hp-text" id="playerHpText">${t.playerHp}/${t.playerMaxHp}</span>
          </div>
          <div class="player-side" id="playerCard">
            <div class="player-stage">
              ${O(s,{size:"xl",mood:"attack",hatIcon:n,hatId:i,petIcon:a})}
            </div>
            <div class="player-name">${r}</div>
          </div>
        </div>
      </div>

      <div class="battle-panel">
        <div class="question-topbar">
          <div class="progress-text" id="progressText">第 ${t.questionsAnswered+1} / 10 题</div>
          <div class="timer-wrap">
            <div class="timer-ring">
              <svg viewBox="0 0 44 44" class="timer-svg">
                <circle cx="22" cy="22" r="18" fill="none" stroke="#e8e0d5" stroke-width="4"/>
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--color-primary)" stroke-width="4"
                  stroke-dasharray="113" stroke-dashoffset="0" id="timerCircle"
                  stroke-linecap="round" transform="rotate(-90 22 22)"/>
              </svg>
              <span class="timer-text" id="timerText">10</span>
            </div>
          </div>
        </div>

        <div class="question-card card" id="questionCard">
          <div class="question-text${y.text.length>12?" long":""}" id="questionText">${y.text}</div>
        </div>

        <div class="answer-display">
          <span id="answerDisplay">_</span>
        </div>

        <div class="numpad" id="numpad">
          ${[1,2,3,4,5,6,7,8,9,"⌫",0,"✓"].map(u=>`
            <button class="numpad-btn${u==="✓"?" numpad-confirm":u==="⌫"?" numpad-del":""}"
              data-key="${u}" type="button">${u}</button>
          `).join("")}
        </div>
      </div>
    </div>
  `,ge(e,t,t.islandId),He(e)}let d="";function ge(e,t,s){d="",b(e),e.querySelector("#numpad").addEventListener("click",i=>{const a=i.target.closest(".numpad-btn");if(!a)return;const c=a.dataset.key;x(c,e,t,s)});const n=i=>{if(!e.isConnected){document.removeEventListener("keydown",n);return}i.key>="0"&&i.key<="9"?x(i.key,e,t,s):i.key==="Backspace"?x("⌫",e,t,s):i.key==="Enter"&&x("✓",e,t,s)};document.addEventListener("keydown",n)}function x(e,t,s,r){if(e==="⌫")d=d.slice(0,-1);else if(e==="✓"){be(t,s,r);return}else d.length<4&&(d+=e);b(t)}function b(e){const t=e.querySelector("#answerDisplay");t&&(t.textContent=d||"_")}function be(e,t,s){var i;if(!d)return;const r=parseInt(d,10),n=t.currentQuestion.answer;if(p(),r===n){const{isCombo:a}=ee(t),c=f();c&&Y(c),a?ve():me(),H(e,"success"),L(e,q(((i=f())==null?void 0:i.avatar)??"fox"),"attack"),Te(e),a&&qe(e,t.combo)}else{const a=f();Q(a,t.currentQuestion.text,n),F(a),te(t),_(),H(e,"danger"),N(e),L(e,q(a.avatar),"hurt"),V(e)}if(d="",D(e,t),$e(e,t),P(t)){setTimeout(()=>U(e,t),600);return}t.currentQuestion=C(s,t.difficulty),t.timeLeft=t.timeLimit,setTimeout(()=>{R(e,t),G(e,t),S(e,t,s)},400)}function S(e,t,s){p();const r=100;g=setInterval(()=>{if(!e.isConnected){p();return}if(t.timeLeft-=r,t.timeUsed+=r,we(e,t),t.timeLeft<=0){p(),se(t);const n=f();if(n&&(Q(n,t.currentQuestion.text,t.currentQuestion.answer),F(n)),_(),H(e,"danger"),N(e),L(e,q((n==null?void 0:n.avatar)??"fox"),"hurt"),V(e),D(e,t),d="",b(e),P(t)){setTimeout(()=>U(e,t),600);return}t.currentQuestion=C(s,t.difficulty),t.timeLeft=t.timeLimit,setTimeout(()=>{R(e,t),G(e,t),S(e,t,s)},400)}},r)}function we(e,t){const s=e.querySelector("#timerCircle"),r=e.querySelector("#timerText");if(!s||!r)return;const n=t.timeLeft/t.timeLimit,i=113;s.style.strokeDashoffset=String(i*(1-n)),s.style.stroke=n<.3?"var(--color-danger)":"var(--color-primary)",r.textContent=String(Math.ceil(t.timeLeft/1e3))}function D(e,t){const s=e.querySelector("#monsterHpFill"),r=e.querySelector("#playerHpFill"),n=e.querySelector("#monsterHpText"),i=e.querySelector("#playerHpText");s&&(s.style.width=`${t.monster.currentHp/t.monster.maxHp*100}%`),r&&(r.style.width=`${t.playerHp/t.playerMaxHp*100}%`),n&&(n.textContent=`${t.monster.currentHp}/${t.monster.maxHp}`),i&&(i.textContent=`${t.playerHp}/${t.playerMaxHp}`)}function $e(e,t){const s=e.querySelector("#scoreVal");s&&(s.textContent=String(t.score));const r=e.querySelector("#comboDisplay");r&&(r.style.opacity=t.combo>=3?"1":"0",r.textContent=`🔥 ${t.combo}连击`)}function R(e,t){const s=e.querySelector("#questionText");if(s){const r=t.currentQuestion.text;s.textContent=r,s.classList.toggle("long",r.length>12),s.classList.remove("pop-in"),s.offsetWidth,s.classList.add("pop-in")}b(e)}function G(e,t){const s=e.querySelector("#progressText");s&&(s.textContent=`第 ${t.questionsAnswered+1} / 10 题`)}function H(e,t){const s=e.querySelector("#battleScreen");s&&(s.classList.remove("flash-success","flash-danger"),s.offsetWidth,s.classList.add(t==="success"?"flash-success":"flash-danger"),setTimeout(()=>s.classList.remove("flash-success","flash-danger"),400))}function N(e){const t=e.querySelector("#questionCard");t&&(t.classList.remove("shake"),t.offsetWidth,t.classList.add("shake"),setTimeout(()=>t.classList.remove("shake"),400))}function Te(e){const t=e.querySelector("#monsterEmoji"),s=e.querySelector("#monsterCard"),r=e.querySelector("#monsterFlash");t&&(t.classList.remove("monster-hit"),s==null||s.classList.remove("fighter-hit"),r==null||r.classList.remove("active"),t.offsetWidth,t.classList.add("monster-hit"),s==null||s.classList.add("fighter-hit"),r==null||r.classList.add("active"),setTimeout(()=>t.classList.remove("monster-hit"),400),setTimeout(()=>s==null?void 0:s.classList.remove("fighter-hit"),420),setTimeout(()=>r==null?void 0:r.classList.remove("active"),220))}function V(e){const t=e.querySelector("#playerCard"),s=e.querySelector("#playerFlash");t&&(t.classList.remove("fighter-hit"),s==null||s.classList.remove("active"),t.offsetWidth,t.classList.add("fighter-hit"),s==null||s.classList.add("active"),setTimeout(()=>t.classList.remove("fighter-hit"),420),setTimeout(()=>s==null?void 0:s.classList.remove("active"),220))}function qe(e,t){var r;const s=document.createElement("div");s.className="combo-popup pop-in",s.textContent=`🔥 ${t}连击！`,(r=e.querySelector("#battleScreen"))==null||r.appendChild(s),setTimeout(()=>s.remove(),1e3)}function L(e,t,s){const r=e.querySelector("#battleFxLayer");if(!r)return;const n=document.createElement("div");n.className=`battle-fx battle-fx-${s} battle-fx-${t}`,s==="attack"?n.innerHTML=`
      <div class="fx-core"></div>
      <div class="fx-trail"></div>
      <div class="fx-spark fx-spark-1"></div>
      <div class="fx-spark fx-spark-2"></div>
      <div class="fx-spark fx-spark-3"></div>
    `:n.innerHTML=`
      <div class="fx-wave"></div>
      <div class="fx-shard fx-shard-1"></div>
      <div class="fx-shard fx-shard-2"></div>
      <div class="fx-shard fx-shard-3"></div>
    `,r.appendChild(n),setTimeout(()=>n.remove(),s==="attack"?820:760)}function He(e){var t;(t=e.querySelector("#backBtn"))==null||t.addEventListener("click",()=>{p(),k("map")})}function U(e,t){p(),fe(),e.querySelector("#battleScreen").classList.add(t.monster.currentHp<=0?"battle-finish-win":"battle-finish-lose"),setTimeout(()=>Le(e,t),480)}function Le(e,t){var v,A;const s=f(),r=re(t),{player:n,newLevel:i,newUnlocks:a}=X(s,r.xpGained);z(n,r.coinsGained);const c=K(n,{battleWon:t.monster.currentHp<=0,hadCombo:t.hadCombo,perfectBattle:t.playerHp>=t.playerMaxHp&&t.monster.currentHp<=0});r.newLevel=i,r.newUnlocks=a,r.newAchievements=c;const y=["⭐","⭐","⭐"],u=e.querySelector("#battleScreen");u.innerHTML=`
    <div class="result-screen">
      <div class="result-title">${t.monster.currentHp<=0?"🎉 胜利！":t.playerHp<=0?"💔 失败":"⏱️ 结束！"}</div>
      <div class="result-monster">${t.monster.emoji}</div>
      <div class="stars">
        ${y.map((h,M)=>`<span class="star${M<r.stars?" active":""}" style="animation-delay:${M*.2}s">${h}</span>`).join("")}
      </div>
      <div class="result-stats card">
        <div class="stat-row"><span>答对题数</span><span>${r.questionsCorrect} / ${r.questionsTotal}</span></div>
        <div class="stat-row"><span>获得经验</span><span>+${r.xpGained} XP</span></div>
        <div class="stat-row"><span>获得金币</span><span>+${r.coinsGained} 🪙</span></div>
        ${i?`<div class="stat-row level-up"><span>🎊 升级了！</span><span>Lv.${i}</span></div>`:""}
        ${a!=null&&a.length?`<div class="stat-row unlock"><span>🔓 解锁新岛屿！</span><span>${a.join(", ")}</span></div>`:""}
        ${c.length?`<div class="achievement-unlock-list">${c.map(h=>`
          <div class="stat-row unlock">
            <span>${h.icon} ${h.name}</span>
            <span>新成就</span>
          </div>
        `).join("")}</div>`:""}
      </div>
      <div class="result-btns">
        <button class="btn btn-primary btn-lg" id="playAgainBtn">再来一次 🔄</button>
        <button class="btn btn-secondary" id="mapBtn">返回地图 🗺️</button>
      </div>
    </div>
  `,(v=e.querySelector("#playAgainBtn"))==null||v.addEventListener("click",()=>{p(),he(e,{islandId:t.islandId})}),(A=e.querySelector("#mapBtn"))==null||A.addEventListener("click",()=>{p(),k("map")})}function ke(e){return e?`skin-${e.replace(/^skin_/,"")}`:"skin-default"}export{he as mount};
