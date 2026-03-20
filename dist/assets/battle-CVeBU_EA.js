import{l as h,n as x,a as _,b as D,d as P}from"./index-DL5ioRz0.js";const g=5,S=5,y=1e4,C=10;function G(t,e){const s={addition:{name:"沙滩螃蟹",emoji:"🦀"},subtraction:{name:"森林精灵",emoji:"🧝"},multiplication:{name:"峡谷巨龙",emoji:"🐉"}}[t]??{name:"神秘怪物",emoji:"👾"};return{name:s.name,emoji:s.emoji,maxHp:S,currentHp:S,level:e}}function V(t,e){return{islandId:t,monster:G(t,e),playerHp:g,playerMaxHp:g,currentQuestion:null,timeLeft:y,timeLimit:y,combo:0,score:0,questionsAnswered:0,questionsCorrect:0,startTime:Date.now(),totalTime:C*y,timeUsed:0,consecutiveWrong:0,difficulty:1}}function F(t){t.questionsAnswered++,t.questionsCorrect++,t.consecutiveWrong=0,t.combo++;const e=t.combo>0&&t.combo%3===0,n=e?2:1;return t.monster.currentHp=Math.max(0,t.monster.currentHp-n),t.score+=e?20:10,t.questionsCorrect%3===0&&t.difficulty<3&&t.difficulty++,{damage:n,isCombo:e}}function R(t){t.questionsAnswered++,t.combo=0,t.consecutiveWrong++,t.playerHp=Math.max(0,t.playerHp-1),t.consecutiveWrong>=3&&t.difficulty>1&&(t.difficulty--,t.consecutiveWrong=0)}function U(t){t.questionsAnswered++,t.combo=0,t.consecutiveWrong++,t.playerHp=Math.max(0,t.playerHp-1)}function k(t){return t.playerHp<=0||t.monster.currentHp<=0||t.questionsAnswered>=C}function N(t){const n=(Date.now()-t.startTime)/t.totalTime;let s=1;t.playerHp>=t.playerMaxHp&&n<.6?s=3:t.playerHp>=2&&(s=2);const i=s*20+t.questionsCorrect*5,r=s*10+t.questionsCorrect*2;return{stars:s,xpGained:i,coinsGained:r,questionsCorrect:t.questionsCorrect,questionsTotal:t.questionsAnswered}}function o(t,e){return Math.floor(Math.random()*(e-t+1))+t}function L(t){let e,n;return t===1?(e=o(1,10),n=o(1,10)):t===2?(e=o(5,20),n=o(5,20)):(e=o(10,50),n=o(10,50)),{text:`${e} + ${n} = ?`,answer:e+n,operands:[e,n],operator:"+",difficulty:t}}function O(t){let e,n;return t===1?(n=o(1,9),e=o(n,10)):t===2?(n=o(5,15),e=o(n,25)):(n=o(10,40),e=o(n,80)),{text:`${e} - ${n} = ?`,answer:e-n,operands:[e,n],operator:"-",difficulty:t}}function X(t){let e,n;return t===1?(e=o(2,5),n=o(2,5)):t===2?(e=o(2,9),n=o(2,9)):(e=o(3,9),n=o(3,12)),{text:`${e} × ${n} = ?`,answer:e*n,operands:[e,n],operator:"×",difficulty:t}}function T(t,e){const n=Math.max(1,Math.min(3,e));switch(t){case"addition":return L(n);case"subtraction":return O(n);case"multiplication":return X(n);default:return L(n)}}let d=null;function K(){return d||(d=new AudioContext),d}function l(t,e,n="sine",s=.3){try{const i=K(),r=i.createOscillator(),c=i.createGain();r.connect(c),c.connect(i.destination),r.type=n,r.frequency.setValueAtTime(t,i.currentTime),c.gain.setValueAtTime(s,i.currentTime),c.gain.exponentialRampToValueAtTime(.001,i.currentTime+e),r.start(i.currentTime),r.stop(i.currentTime+e)}catch{}}function Y(){l(523,.1),setTimeout(()=>l(659,.1),80),setTimeout(()=>l(784,.2),160)}function A(){l(200,.15,"sawtooth",.2),setTimeout(()=>l(150,.2,"sawtooth",.15),120)}function z(){l(523,.08),setTimeout(()=>l(659,.08),60),setTimeout(()=>l(784,.08),120),setTimeout(()=>l(1047,.25),180)}function J(){[523,659,784,1047].forEach((e,n)=>setTimeout(()=>l(e,.15),n*100))}function Z(){(d==null?void 0:d.state)==="suspended"&&d.resume()}let m=null;function u(){m!==null&&(clearInterval(m),m=null)}function ee(t,e){u(),Z();const n=(e==null?void 0:e.islandId)??"addition",s=h();if(!s){x("home");return}const i=V(n,s.level);i.currentQuestion=T(n,i.difficulty),te(t,i,s.avatar,s.nickname),w(t,i,n)}function te(t,e,n,s){const i=e.currentQuestion;t.innerHTML=`
    <div class="battle-screen" id="battleScreen">
      <div class="battle-header">
        <button class="btn-back" id="backBtn">← 退出</button>
        <div class="battle-score">得分: <span id="scoreVal">${e.score}</span></div>
        <div class="battle-combo" id="comboDisplay" style="opacity:${e.combo>=3?1:0}">
          🔥 ${e.combo}连击
        </div>
      </div>

      <div class="battle-arena">
        <div class="monster-side">
          <div class="monster-emoji" id="monsterEmoji">${e.monster.emoji}</div>
          <div class="monster-name">${e.monster.name}</div>
          <div class="hp-bar-wrap">
            <div class="hp-bar monster-hp-bar">
              <div class="hp-fill monster-hp-fill" id="monsterHpFill"
                style="width:${e.monster.currentHp/e.monster.maxHp*100}%"></div>
            </div>
            <span class="hp-text" id="monsterHpText">${e.monster.currentHp}/${e.monster.maxHp}</span>
          </div>
        </div>

        <div class="vs-badge">VS</div>

        <div class="player-side">
          <div class="player-emoji">${n}</div>
          <div class="player-name">${s}</div>
          <div class="hp-bar-wrap">
            <div class="hp-bar player-hp-bar">
              <div class="hp-fill player-hp-fill" id="playerHpFill"
                style="width:${e.playerHp/e.playerMaxHp*100}%"></div>
            </div>
            <span class="hp-text" id="playerHpText">${e.playerHp}/${e.playerMaxHp}</span>
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
        <div class="progress-text" id="progressText">第 ${e.questionsAnswered+1} / 10 题</div>
      </div>

      <div class="question-card card" id="questionCard">
        <div class="question-text" id="questionText">${i.text}</div>
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
  `,ne(t,e,e.islandId),le(t)}let a="";function ne(t,e,n){a="",f(t),t.querySelector("#numpad").addEventListener("click",r=>{const c=r.target.closest(".numpad-btn");if(!c)return;const v=c.dataset.key;p(v,t,e,n)});const i=r=>{if(!t.isConnected){document.removeEventListener("keydown",i);return}r.key>="0"&&r.key<="9"?p(r.key,t,e,n):r.key==="Backspace"?p("⌫",t,e,n):r.key==="Enter"&&p("✓",t,e,n)};document.addEventListener("keydown",i)}function p(t,e,n,s){if(t==="⌫")a=a.slice(0,-1);else if(t==="✓"){se(e,n,s);return}else a.length<4&&(a+=t);f(e)}function f(t){const e=t.querySelector("#answerDisplay");e&&(e.textContent=a||"_")}function se(t,e,n){if(!a)return;const s=parseInt(a,10),i=e.currentQuestion.answer;if(u(),s===i){const{isCombo:r}=F(e);r?z():Y(),b(t,"success"),oe(t),r&&ce(t,e.combo)}else{const r=h();P(r,e.currentQuestion.text,i),R(e),A(),b(t,"danger"),B(t)}if(a="",M(t,e),ie(t,e),k(e)){setTimeout(()=>W(t,e),600);return}e.currentQuestion=T(n,e.difficulty),e.timeLeft=e.timeLimit,setTimeout(()=>{E(t,e),j(t,e),w(t,e,n)},400)}function w(t,e,n){u();const s=100;m=setInterval(()=>{if(!t.isConnected){u();return}if(e.timeLeft-=s,e.timeUsed+=s,re(t,e),e.timeLeft<=0){if(u(),U(e),A(),b(t,"danger"),B(t),M(t,e),a="",f(t),k(e)){setTimeout(()=>W(t,e),600);return}e.currentQuestion=T(n,e.difficulty),e.timeLeft=e.timeLimit,setTimeout(()=>{E(t,e),j(t,e),w(t,e,n)},400)}},s)}function re(t,e){const n=t.querySelector("#timerCircle"),s=t.querySelector("#timerText");if(!n||!s)return;const i=e.timeLeft/e.timeLimit,r=113;n.style.strokeDashoffset=String(r*(1-i)),n.style.stroke=i<.3?"var(--color-danger)":"var(--color-primary)",s.textContent=String(Math.ceil(e.timeLeft/1e3))}function M(t,e){const n=t.querySelector("#monsterHpFill"),s=t.querySelector("#playerHpFill"),i=t.querySelector("#monsterHpText"),r=t.querySelector("#playerHpText");n&&(n.style.width=`${e.monster.currentHp/e.monster.maxHp*100}%`),s&&(s.style.width=`${e.playerHp/e.playerMaxHp*100}%`),i&&(i.textContent=`${e.monster.currentHp}/${e.monster.maxHp}`),r&&(r.textContent=`${e.playerHp}/${e.playerMaxHp}`)}function ie(t,e){const n=t.querySelector("#scoreVal");n&&(n.textContent=String(e.score));const s=t.querySelector("#comboDisplay");s&&(s.style.opacity=e.combo>=3?"1":"0",s.textContent=`🔥 ${e.combo}连击`)}function E(t,e){const n=t.querySelector("#questionText");n&&(n.textContent=e.currentQuestion.text,n.classList.remove("pop-in"),n.offsetWidth,n.classList.add("pop-in")),f(t)}function j(t,e){const n=t.querySelector("#progressText");n&&(n.textContent=`第 ${e.questionsAnswered+1} / 10 题`)}function b(t,e){const n=t.querySelector("#battleScreen");n&&(n.classList.remove("flash-success","flash-danger"),n.offsetWidth,n.classList.add(e==="success"?"flash-success":"flash-danger"),setTimeout(()=>n.classList.remove("flash-success","flash-danger"),400))}function B(t){const e=t.querySelector("#questionCard");e&&(e.classList.remove("shake"),e.offsetWidth,e.classList.add("shake"),setTimeout(()=>e.classList.remove("shake"),400))}function oe(t){const e=t.querySelector("#monsterEmoji");e&&(e.classList.remove("monster-hit"),e.offsetWidth,e.classList.add("monster-hit"),setTimeout(()=>e.classList.remove("monster-hit"),400))}function ce(t,e){var s;const n=document.createElement("div");n.className="combo-popup pop-in",n.textContent=`🔥 ${e}连击！`,(s=t.querySelector("#battleScreen"))==null||s.appendChild(n),setTimeout(()=>n.remove(),1e3)}function le(t){var e;(e=t.querySelector("#backBtn"))==null||e.addEventListener("click",()=>{u(),x("map")})}function W(t,e){var $,H;u(),J();const n=h(),s=N(e),{player:i,newLevel:r,newUnlocks:c}=_(n,s.xpGained);D(i,s.coinsGained),s.newLevel=r,s.newUnlocks=c;const v=["⭐","⭐","⭐"],Q=t.querySelector("#battleScreen");Q.innerHTML=`
    <div class="result-screen">
      <div class="result-title">${e.monster.currentHp<=0?"🎉 胜利！":e.playerHp<=0?"💔 失败":"⏱️ 结束！"}</div>
      <div class="result-monster">${e.monster.emoji}</div>
      <div class="stars">
        ${v.map((I,q)=>`<span class="star${q<s.stars?" active":""}" style="animation-delay:${q*.2}s">${I}</span>`).join("")}
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
  `,($=t.querySelector("#playAgainBtn"))==null||$.addEventListener("click",()=>{u(),ee(t,{islandId:e.islandId})}),(H=t.querySelector("#mapBtn"))==null||H.addEventListener("click",()=>{u(),x("map")})}export{ee as mount};
