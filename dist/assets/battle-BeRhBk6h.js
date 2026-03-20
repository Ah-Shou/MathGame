import{l as $,n as w,a as D,b as G,d as R}from"./index-DvB6sfnS.js";const L=5,C=5,b=1e4,M=10;function V(e,t){const s={addition:{name:"沙滩螃蟹",emoji:"🦀"},subtraction:{name:"森林精灵",emoji:"🧝"},multiplication:{name:"峡谷巨龙",emoji:"🐉"},division:{name:"洞穴蝙蝠",emoji:"🦇"},geometry:{name:"几何魔方",emoji:"🎲"},logic:{name:"迷宫幽灵",emoji:"👻"}}[e]??{name:"神秘怪物",emoji:"👾"};return{name:s.name,emoji:s.emoji,maxHp:C,currentHp:C,level:t}}function F(e,t){return{islandId:e,monster:V(e,t),playerHp:L,playerMaxHp:L,currentQuestion:null,timeLeft:b,timeLimit:b,combo:0,score:0,questionsAnswered:0,questionsCorrect:0,startTime:Date.now(),totalTime:M*b,timeUsed:0,consecutiveWrong:0,difficulty:1}}function U(e){e.questionsAnswered++,e.questionsCorrect++,e.consecutiveWrong=0,e.combo++;const t=e.combo>0&&e.combo%3===0,n=t?2:1;return e.monster.currentHp=Math.max(0,e.monster.currentHp-n),e.score+=t?20:10,e.questionsCorrect%3===0&&e.difficulty<3&&e.difficulty++,{damage:n,isCombo:t}}function N(e){e.questionsAnswered++,e.combo=0,e.consecutiveWrong++,e.playerHp=Math.max(0,e.playerHp-1),e.consecutiveWrong>=3&&e.difficulty>1&&(e.difficulty--,e.consecutiveWrong=0)}function O(e){e.questionsAnswered++,e.combo=0,e.consecutiveWrong++,e.playerHp=Math.max(0,e.playerHp-1)}function j(e){return e.playerHp<=0||e.monster.currentHp<=0||e.questionsAnswered>=M}function X(e){const n=(Date.now()-e.startTime)/e.totalTime;let s=1;e.playerHp>=e.playerMaxHp&&n<.6?s=3:e.playerHp>=2&&(s=2);const o=s*20+e.questionsCorrect*5,r=s*10+e.questionsCorrect*2;return{stars:s,xpGained:o,coinsGained:r,questionsCorrect:e.questionsCorrect,questionsTotal:e.questionsAnswered}}function i(e,t){return Math.floor(Math.random()*(t-e+1))+e}function k(e){let t,n;return e===1?(t=i(1,10),n=i(1,10)):e===2?(t=i(5,20),n=i(5,20)):(t=i(10,50),n=i(10,50)),{text:`${t} + ${n} = ?`,answer:t+n,operands:[t,n],operator:"+",difficulty:e}}function K(e){let t,n;return e===1?(n=i(1,9),t=i(n,10)):e===2?(n=i(5,15),t=i(n,25)):(n=i(10,40),t=i(n,80)),{text:`${t} - ${n} = ?`,answer:t-n,operands:[t,n],operator:"-",difficulty:e}}function Y(e){let t,n;return e===1?(t=i(2,5),n=i(2,5)):e===2?(t=i(2,9),n=i(2,9)):(t=i(3,9),n=i(3,12)),{text:`${t} × ${n} = ?`,answer:t*n,operands:[t,n],operator:"×",difficulty:e}}function z(e){let t,n;e===1?(t=i(2,5),n=i(1,5)):e===2?(t=i(2,9),n=i(1,9)):(t=i(3,9),n=i(2,12));const s=t*n;return{text:`${s} ÷ ${t} = ?`,answer:n,operands:[s,t],operator:"÷",difficulty:e}}function J(e){return e===1?Z():e===2?Math.random()<.5?A():ee():Math.random()<.5?te():A()}function Z(){const e=i(2,9),t=e*4;return{text:`正方形边长${e}，周长=?`,answer:t,operands:[e,4],operator:"?",difficulty:1}}function A(){const e=i(3,12),t=i(2,8),n=(e+t)*2;return{text:`长方形长${e}宽${t}，周长=?`,answer:n,operands:[e,t],operator:"?",difficulty:2}}function ee(){const e=i(2,9),t=e*e;return{text:`正方形边长${e}，面积=?`,answer:t,operands:[e,e],operator:"?",difficulty:2}}function te(){const e=i(3,12),t=i(2,9),n=e*t;return{text:`长方形长${e}宽${t}，面积=?`,answer:n,operands:[e,t],operator:"?",difficulty:3}}function ne(e){return e===1?x(2,5,4):e===2?x(3,10,5):x(5,20,6)}function x(e,t,n){const s=i(e,t),o=i(1,10),r=Array.from({length:n},(f,p)=>o+p*s),c=i(1,n-1),m=r[c];return{text:`${r.map((f,p)=>p===c?"?":String(f)).join(", ")}`,answer:m,operands:[o,s],operator:"?",difficulty:1}}function T(e,t){const n=Math.max(1,Math.min(3,t));switch(e){case"addition":return k(n);case"subtraction":return K(n);case"multiplication":return Y(n);case"division":return z(n);case"geometry":return J(n);case"logic":return ne(n);default:return k(n)}}let d=null;function se(){return d||(d=new AudioContext),d}function a(e,t,n="sine",s=.3){try{const o=se(),r=o.createOscillator(),c=o.createGain();r.connect(c),c.connect(o.destination),r.type=n,r.frequency.setValueAtTime(e,o.currentTime),c.gain.setValueAtTime(s,o.currentTime),c.gain.exponentialRampToValueAtTime(.001,o.currentTime+t),r.start(o.currentTime),r.stop(o.currentTime+t)}catch{}}function re(){a(523,.1),setTimeout(()=>a(659,.1),80),setTimeout(()=>a(784,.2),160)}function E(){a(200,.15,"sawtooth",.2),setTimeout(()=>a(150,.2,"sawtooth",.15),120)}function oe(){a(523,.08),setTimeout(()=>a(659,.08),60),setTimeout(()=>a(784,.08),120),setTimeout(()=>a(1047,.25),180)}function ie(){[523,659,784,1047].forEach((t,n)=>setTimeout(()=>a(t,.15),n*100))}function ce(){(d==null?void 0:d.state)==="suspended"&&d.resume()}let y=null;function u(){y!==null&&(clearInterval(y),y=null)}function ae(e,t){u(),ce();const n=(t==null?void 0:t.islandId)??"addition",s=$();if(!s){w("home");return}const o=F(n,s.level);o.currentQuestion=T(n,o.difficulty),le(e,o,s.avatar,s.nickname),q(e,o,n)}function le(e,t,n,s){const o=t.currentQuestion;e.innerHTML=`
    <div class="battle-screen" id="battleScreen">
      <div class="battle-header">
        <button class="btn-back" id="backBtn">← 退出</button>
        <div class="battle-score">得分: <span id="scoreVal">${t.score}</span></div>
        <div class="battle-combo" id="comboDisplay" style="opacity:${t.combo>=3?1:0}">
          🔥 ${t.combo}连击
        </div>
      </div>

      <div class="battle-arena">
        <div class="monster-side">
          <div class="monster-emoji" id="monsterEmoji">${t.monster.emoji}</div>
          <div class="monster-name">${t.monster.name}</div>
          <div class="hp-bar-wrap">
            <div class="hp-bar monster-hp-bar">
              <div class="hp-fill monster-hp-fill" id="monsterHpFill"
                style="width:${t.monster.currentHp/t.monster.maxHp*100}%"></div>
            </div>
            <span class="hp-text" id="monsterHpText">${t.monster.currentHp}/${t.monster.maxHp}</span>
          </div>
        </div>

        <div class="vs-badge">VS</div>

        <div class="player-side">
          <div class="player-emoji">${n}</div>
          <div class="player-name">${s}</div>
          <div class="hp-bar-wrap">
            <div class="hp-bar player-hp-bar">
              <div class="hp-fill player-hp-fill" id="playerHpFill"
                style="width:${t.playerHp/t.playerMaxHp*100}%"></div>
            </div>
            <span class="hp-text" id="playerHpText">${t.playerHp}/${t.playerMaxHp}</span>
          </div>
        </div>
      </div>

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
        <div class="progress-text" id="progressText">第 ${t.questionsAnswered+1} / 10 题</div>
      </div>

      <div class="question-card card" id="questionCard">
        <div class="question-text${o.text.length>12?" long":""}" id="questionText">${o.text}</div>
      </div>

      <div class="numpad" id="numpad">
        ${[1,2,3,4,5,6,7,8,9,"⌫",0,"✓"].map(r=>`
          <button class="numpad-btn${r==="✓"?" numpad-confirm":r==="⌫"?" numpad-del":""}"
            data-key="${r}" type="button">${r}</button>
        `).join("")}
      </div>

      <div class="answer-display">
        <span id="answerDisplay">_</span>
      </div>
    </div>
  `,ue(e,t,t.islandId),ye(e)}let l="";function ue(e,t,n){l="",h(e),e.querySelector("#numpad").addEventListener("click",r=>{const c=r.target.closest(".numpad-btn");if(!c)return;const m=c.dataset.key;v(m,e,t,n)});const o=r=>{if(!e.isConnected){document.removeEventListener("keydown",o);return}r.key>="0"&&r.key<="9"?v(r.key,e,t,n):r.key==="Backspace"?v("⌫",e,t,n):r.key==="Enter"&&v("✓",e,t,n)};document.addEventListener("keydown",o)}function v(e,t,n,s){if(e==="⌫")l=l.slice(0,-1);else if(e==="✓"){de(t,n,s);return}else l.length<4&&(l+=e);h(t)}function h(e){const t=e.querySelector("#answerDisplay");t&&(t.textContent=l||"_")}function de(e,t,n){if(!l)return;const s=parseInt(l,10),o=t.currentQuestion.answer;if(u(),s===o){const{isCombo:r}=U(t);r?oe():re(),g(e,"success"),fe(e),r&&ve(e,t.combo)}else{const r=$();R(r,t.currentQuestion.text,o),N(t),E(),g(e,"danger"),I(e)}if(l="",B(e,t),me(e,t),j(t)){setTimeout(()=>P(e,t),600);return}t.currentQuestion=T(n,t.difficulty),t.timeLeft=t.timeLimit,setTimeout(()=>{W(e,t),Q(e,t),q(e,t,n)},400)}function q(e,t,n){u();const s=100;y=setInterval(()=>{if(!e.isConnected){u();return}if(t.timeLeft-=s,t.timeUsed+=s,pe(e,t),t.timeLeft<=0){if(u(),O(t),E(),g(e,"danger"),I(e),B(e,t),l="",h(e),j(t)){setTimeout(()=>P(e,t),600);return}t.currentQuestion=T(n,t.difficulty),t.timeLeft=t.timeLimit,setTimeout(()=>{W(e,t),Q(e,t),q(e,t,n)},400)}},s)}function pe(e,t){const n=e.querySelector("#timerCircle"),s=e.querySelector("#timerText");if(!n||!s)return;const o=t.timeLeft/t.timeLimit,r=113;n.style.strokeDashoffset=String(r*(1-o)),n.style.stroke=o<.3?"var(--color-danger)":"var(--color-primary)",s.textContent=String(Math.ceil(t.timeLeft/1e3))}function B(e,t){const n=e.querySelector("#monsterHpFill"),s=e.querySelector("#playerHpFill"),o=e.querySelector("#monsterHpText"),r=e.querySelector("#playerHpText");n&&(n.style.width=`${t.monster.currentHp/t.monster.maxHp*100}%`),s&&(s.style.width=`${t.playerHp/t.playerMaxHp*100}%`),o&&(o.textContent=`${t.monster.currentHp}/${t.monster.maxHp}`),r&&(r.textContent=`${t.playerHp}/${t.playerMaxHp}`)}function me(e,t){const n=e.querySelector("#scoreVal");n&&(n.textContent=String(t.score));const s=e.querySelector("#comboDisplay");s&&(s.style.opacity=t.combo>=3?"1":"0",s.textContent=`🔥 ${t.combo}连击`)}function W(e,t){const n=e.querySelector("#questionText");if(n){const s=t.currentQuestion.text;n.textContent=s,n.classList.toggle("long",s.length>12),n.classList.remove("pop-in"),n.offsetWidth,n.classList.add("pop-in")}h(e)}function Q(e,t){const n=e.querySelector("#progressText");n&&(n.textContent=`第 ${t.questionsAnswered+1} / 10 题`)}function g(e,t){const n=e.querySelector("#battleScreen");n&&(n.classList.remove("flash-success","flash-danger"),n.offsetWidth,n.classList.add(t==="success"?"flash-success":"flash-danger"),setTimeout(()=>n.classList.remove("flash-success","flash-danger"),400))}function I(e){const t=e.querySelector("#questionCard");t&&(t.classList.remove("shake"),t.offsetWidth,t.classList.add("shake"),setTimeout(()=>t.classList.remove("shake"),400))}function fe(e){const t=e.querySelector("#monsterEmoji");t&&(t.classList.remove("monster-hit"),t.offsetWidth,t.classList.add("monster-hit"),setTimeout(()=>t.classList.remove("monster-hit"),400))}function ve(e,t){var s;const n=document.createElement("div");n.className="combo-popup pop-in",n.textContent=`🔥 ${t}连击！`,(s=e.querySelector("#battleScreen"))==null||s.appendChild(n),setTimeout(()=>n.remove(),1e3)}function ye(e){var t;(t=e.querySelector("#backBtn"))==null||t.addEventListener("click",()=>{u(),w("map")})}function P(e,t){var f,p;u(),ie();const n=$(),s=X(t),{player:o,newLevel:r,newUnlocks:c}=D(n,s.xpGained);G(o,s.coinsGained),s.newLevel=r,s.newUnlocks=c;const m=["⭐","⭐","⭐"],H=e.querySelector("#battleScreen");H.innerHTML=`
    <div class="result-screen">
      <div class="result-title">${t.monster.currentHp<=0?"🎉 胜利！":t.playerHp<=0?"💔 失败":"⏱️ 结束！"}</div>
      <div class="result-monster">${t.monster.emoji}</div>
      <div class="stars">
        ${m.map((_,S)=>`<span class="star${S<s.stars?" active":""}" style="animation-delay:${S*.2}s">${_}</span>`).join("")}
      </div>
      <div class="result-stats card">
        <div class="stat-row"><span>答对题数</span><span>${s.questionsCorrect} / ${s.questionsTotal}</span></div>
        <div class="stat-row"><span>获得经验</span><span>+${s.xpGained} XP</span></div>
        <div class="stat-row"><span>获得金币</span><span>+${s.coinsGained} 🪙</span></div>
        ${r?`<div class="stat-row level-up"><span>🎊 升级了！</span><span>Lv.${r}</span></div>`:""}
        ${c!=null&&c.length?`<div class="stat-row unlock"><span>🔓 解锁新岛屿！</span><span>${c.join(", ")}</span></div>`:""}
      </div>
      <div class="result-btns">
        <button class="btn btn-primary btn-lg" id="playAgainBtn">再来一次 🔄</button>
        <button class="btn btn-secondary" id="mapBtn">返回地图 🗺️</button>
      </div>
    </div>
  `,(f=e.querySelector("#playAgainBtn"))==null||f.addEventListener("click",()=>{u(),ae(e,{islandId:t.islandId})}),(p=e.querySelector("#mapBtn"))==null||p.addEventListener("click",()=>{u(),w("map")})}export{ae as mount};
