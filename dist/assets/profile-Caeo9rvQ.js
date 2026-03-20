import{l as b,n as m,t as S,m as y,d as E,b as v,g as L,A,r as k,e as C,S as w,p as M,q as T}from"./index-BQ5kTxv9.js";let d="skin";function q(i){var g;const e=b();if(!e){m("home");return}S(e),y(e);const u=E(e),I=u.filter(s=>s.unlockedAt).length,a=v(e,"hat"),t=v(e,"pet"),r=v(e,"skin"),h=L(e.avatar);i.innerHTML=`
    <div class="profile-screen">
      <div class="profile-header">
        <button class="btn-back" id="backBtn">← 返回地图</button>
        <div class="profile-summary card">
          <div class="profile-avatar-stage">
            ${k(e.avatar,{size:"lg",mood:"shop",hatIcon:(a==null?void 0:a.icon)??"",hatId:(a==null?void 0:a.id)??"",petIcon:(t==null?void 0:t.icon)??""})}
          </div>
          <div class="profile-main">
            <div class="profile-name">${e.nickname}</div>
            <div class="profile-role">${h.name} · ${h.title}</div>
            <div class="profile-meta">Lv.${e.level} · ${e.coins} 🪙</div>
            <div class="profile-tags">
              <span class="profile-tag">连续登录 ${C(e)} 天</span>
              <span class="profile-tag">连对 ${e.currentCorrectStreak} 题</span>
              <span class="profile-tag">总答对 ${e.totalCorrect} 题</span>
            </div>
          </div>
        </div>
      </div>

      <section class="card profile-section">
        <div class="section-head">
          <div>
            <h2>成就勋章</h2>
            <p>已解锁 ${I} / ${A.length}</p>
          </div>
        </div>
        <div class="achievement-grid">
          ${u.map(s=>`
            <div class="achievement-card${s.unlockedAt?" unlocked":" locked"}">
              <div class="achievement-icon">${s.icon}</div>
              <div class="achievement-name">${s.name}</div>
              <div class="achievement-desc">${s.desc}</div>
              <div class="achievement-status">${s.unlockedAt?"已获得":"未达成"}</div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="card profile-section">
        <div class="section-head">
          <div>
            <h2>装扮商店</h2>
            <p>用金币解锁皮肤、帽子和宠物</p>
          </div>
          <div class="preview-line">
            <span>当前皮肤 ${(r==null?void 0:r.icon)??"🧮"}</span>
            <span>帽子 ${(a==null?void 0:a.icon)??"无"}</span>
            <span>宠物 ${(t==null?void 0:t.icon)??"无"}</span>
          </div>
        </div>

        <div class="shop-tabs">
          ${["skin","hat","pet"].map(s=>`
            <button class="shop-tab${d===s?" active":""}" data-category="${s}" type="button">
              ${H(s)}
            </button>
          `).join("")}
        </div>

        <div class="shop-grid">
          ${w.filter(s=>s.category===d).map(s=>{const c=e.ownedItems.includes(s.id),o=s.category==="skin"&&e.equippedSkin===s.id||s.category==="hat"&&e.equippedHat===s.id||s.category==="pet"&&e.equippedPet===s.id;return`
              <div class="shop-card${o?" equipped":""}">
                <div class="shop-preview">
                  ${k(e.avatar,{size:"md",mood:d==="pet"?"win":"shop",hatIcon:s.category==="hat"?s.icon:(a==null?void 0:a.icon)??"",hatId:s.category==="hat"?s.id:(a==null?void 0:a.id)??"",petIcon:s.category==="pet"?s.icon:(t==null?void 0:t.icon)??""})}
                </div>
                <div class="shop-icon">${s.icon}</div>
                <div class="shop-name">${s.name}</div>
                <div class="shop-price">${s.price} 🪙</div>
                <button
                  class="btn ${c?"btn-secondary":"btn-primary"} shop-action"
                  data-item="${s.id}"
                  data-action="${c?"equip":"buy"}"
                  type="button"
                  ${o?"disabled":""}
                >
                  ${o?"已装备":c?"装备":"购买"}
                </button>
              </div>
            `}).join("")}
        </div>
        <div class="shop-message" id="shopMessage"></div>
      </section>
    </div>
  `,(g=i.querySelector("#backBtn"))==null||g.addEventListener("click",()=>m("map")),i.querySelectorAll(".shop-tab").forEach(s=>{s.addEventListener("click",c=>{d=c.currentTarget.dataset.category,q(i)})}),i.querySelectorAll(".shop-action").forEach(s=>{s.addEventListener("click",c=>{const o=c.currentTarget,l=o.dataset.item,$=o.dataset.action;if(!l||!$)return;const n=b();if(!n)return;const f=$==="buy"?M(n,l):T(n,l);y(n),q(i);const p=i.querySelector("#shopMessage");p&&(p.textContent=f.message,p.classList.toggle("error",!f.ok))})})}function H(i){return i==="skin"?"计算器皮肤":i==="hat"?"帽子":"宠物"}export{q as mount};
