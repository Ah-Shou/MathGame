import{l as t,n as l,I as c}from"./index-DL5ioRz0.js";function o(i){var n;const s=t();if(!s){l("home");return}i.innerHTML=`
    <div class="map-screen">
      <div class="map-header">
        <div class="player-info">
          <span class="player-avatar-badge">${s.avatar}</span>
          <div class="player-details">
            <div class="player-name-text">${s.nickname}</div>
            <div class="player-level-text">Lv.${s.level} · ${s.coins} 🪙</div>
          </div>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar">
            <div class="xp-fill" style="width:${r(s)}%"></div>
          </div>
          <span class="xp-text">${s.xp%100} / 100 XP</span>
        </div>
      </div>

      <div class="map-title">
        <span class="map-title-emoji float">🗺️</span>
        <h2>选择冒险岛屿</h2>
      </div>

      <div class="islands-grid">
        ${c.map(a=>{const e=s.unlockedIslands.includes(a.id),d=["division","geometry","logic"].includes(a.id);return`
            <div class="island-card${e?" unlocked":" locked"}"
              data-island="${a.id}"
              style="--island-color: ${a.color}">
              <div class="island-emoji">${a.emoji}</div>
              <div class="island-name">${a.name}</div>
              <div class="island-desc">${d?"即将开放":a.description}</div>
              ${e?"":`<div class="island-lock">🔒 Lv.${a.requiredLevel}</div>`}
              ${e?`<button class="btn btn-primary island-btn" data-island="${a.id}">出发！</button>`:""}
            </div>
          `}).join("")}
      </div>

      <div class="map-footer">
        <button class="btn btn-secondary" id="changePlayerBtn">换个角色</button>
      </div>
    </div>
  `,i.querySelectorAll(".island-btn").forEach(a=>{a.addEventListener("click",e=>{const d=e.currentTarget.dataset.island;l("battle",{islandId:d})})}),(n=i.querySelector("#changePlayerBtn"))==null||n.addEventListener("click",()=>{l("home")})}function r(i){return i.xp%100}export{o as mount};
