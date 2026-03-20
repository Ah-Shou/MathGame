import{l as m,n as d,b as r,d as u,g as $,r as b,e as y,I as h}from"./index-BQ5kTxv9.js";function k(s){var n,c;const e=m();if(!e){d("home");return}const t=r(e,"hat"),l=r(e,"pet"),o=u(e).filter(a=>a.unlockedAt).length,v=$(e.avatar);s.innerHTML=`
    <div class="map-screen">
      <div class="map-header">
        <div class="player-info">
          <div class="player-avatar-stage">
            ${b(e.avatar,{size:"md",mood:"idle",hatIcon:(t==null?void 0:t.icon)??"",hatId:(t==null?void 0:t.id)??"",petIcon:(l==null?void 0:l.icon)??""})}
          </div>
          <div class="player-details">
            <div class="player-name-text">${e.nickname} · ${v.name}</div>
            <div class="player-level-text">Lv.${e.level} · ${e.coins} 🪙</div>
            <div class="player-bonus-text">勋章 ${o} 枚 · 连续登录 ${y(e)} 天</div>
          </div>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar">
            <div class="xp-fill" style="width:${f(e)}%"></div>
          </div>
          <span class="xp-text">${e.xp%100} / 100 XP</span>
        </div>
      </div>

      <div class="map-title">
        <span class="map-title-emoji float">🗺️</span>
        <h2>选择冒险岛屿</h2>
      </div>

      <div class="islands-grid">
        ${h.map(a=>{const i=e.unlockedIslands.includes(a.id);return`
            <div class="island-card${i?" unlocked":" locked"}"
              data-island="${a.id}"
              style="--island-color: ${a.color}">
              <div class="island-emoji">${a.emoji}</div>
              <div class="island-name">${a.name}</div>
              <div class="island-desc">${a.description}</div>
              ${i?"":`<div class="island-lock">🔒 Lv.${a.requiredLevel}</div>`}
              ${i?`<button class="btn btn-primary island-btn" data-island="${a.id}">出发！</button>`:""}
            </div>
          `}).join("")}
      </div>

      <div class="map-footer">
        <button class="btn btn-primary" id="profileBtn">商店与我的</button>
        <button class="btn btn-secondary" id="changePlayerBtn">换个角色</button>
      </div>
    </div>
  `,s.querySelectorAll(".island-btn").forEach(a=>{a.addEventListener("click",i=>{const p=i.currentTarget.dataset.island;d("battle",{islandId:p})})}),(n=s.querySelector("#changePlayerBtn"))==null||n.addEventListener("click",()=>{d("home")}),(c=s.querySelector("#profileBtn"))==null||c.addEventListener("click",()=>{d("profile")})}function f(s){return s.xp%100}export{k as mount};
