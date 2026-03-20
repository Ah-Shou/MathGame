import{l as n,n as d,I as c}from"./index-DvB6sfnS.js";function o(e){var l;const s=n();if(!s){d("home");return}e.innerHTML=`
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
        ${c.map(a=>{const i=s.unlockedIslands.includes(a.id);return`
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
        <button class="btn btn-secondary" id="changePlayerBtn">换个角色</button>
      </div>
    </div>
  `,e.querySelectorAll(".island-btn").forEach(a=>{a.addEventListener("click",i=>{const t=i.currentTarget.dataset.island;d("battle",{islandId:t})})}),(l=e.querySelector("#changePlayerBtn"))==null||l.addEventListener("click",()=>{d("home")})}function r(e){return e.xp%100}export{o as mount};
