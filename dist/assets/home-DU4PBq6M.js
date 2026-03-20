import{l as f,g as h,r as n,s as y,c as w,n as k,a as S}from"./index-BQ5kTxv9.js";const g=S();function C(e){const r=f(),u=(r==null?void 0:r.nickname)??"",o=(r==null?void 0:r.avatar)??g[0].id,l=h(o);e.innerHTML=`
    <div class="home-screen">
      <div class="home-hero">
        <div class="home-title-emoji float">🌟</div>
        <h1 class="home-title">小小数学探险家</h1>
        <p class="home-subtitle">开始你的数学冒险之旅！</p>
      </div>

      <div class="home-form card">
        <div class="form-section">
          <label class="form-label">选择你的动物伙伴</label>
          <div class="hero-preview card">
            <div class="hero-preview-stage" id="heroPreviewStage">
              ${n(o,{size:"lg",mood:"shop"})}
            </div>
            <div class="hero-preview-meta">
              <div class="hero-preview-name" id="heroPreviewName">${l.name}</div>
              <div class="hero-preview-desc" id="heroPreviewDesc">${l.title}</div>
            </div>
          </div>
          <div class="avatar-grid" id="avatarGrid">
            ${g.map(t=>`
              <button class="avatar-btn${t.id===o?" selected":""}" data-avatar="${t.id}" type="button">
                <div class="avatar-mini">${n(t.id,{size:"sm",mood:"idle",showPet:!1})}</div>
                <div class="avatar-name">${t.name}</div>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="form-section">
          <label class="form-label" for="nicknameInput">你的昵称</label>
          <input
            id="nicknameInput"
            class="input"
            type="text"
            placeholder="输入昵称（2-8个字）"
            maxlength="8"
            value="${u}"
          />
        </div>

        <button class="btn btn-primary btn-lg start-btn" id="startBtn" type="button">
          出发冒险！🚀
        </button>
      </div>
    </div>
  `,z();let i=o;const c=e.querySelector("#avatarGrid");c.addEventListener("click",t=>{const a=t.target.closest(".avatar-btn");if(!a)return;i=a.dataset.avatar,c.querySelectorAll(".avatar-btn").forEach(b=>b.classList.remove("selected")),a.classList.add("selected");const d=h(i),m=e.querySelector("#heroPreviewStage"),p=e.querySelector("#heroPreviewName"),v=e.querySelector("#heroPreviewDesc");m&&(m.innerHTML=n(i,{size:"lg",mood:"shop"})),p&&(p.textContent=d.name),v&&(v.textContent=d.title)});const x=e.querySelector("#startBtn"),s=e.querySelector("#nicknameInput");x.addEventListener("click",()=>{const t=s.value.trim();if(t.length<2){s.classList.add("shake"),s.focus(),setTimeout(()=>s.classList.remove("shake"),400);return}const a=f();a?(a.nickname=t,a.avatar=i,y(a)):w(t,i),k("map")})}function z(){if(document.getElementById("home-styles"))return;const e=document.createElement("style");e.id="home-styles",e.textContent=`
    .home-screen {
      padding: 32px 20px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .home-hero {
      text-align: center;
      padding: 16px 0;
    }
    .home-title-emoji {
      font-size: 3.5rem;
      display: block;
      margin-bottom: 8px;
    }
    .home-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 8px;
    }
    .home-subtitle {
      color: var(--color-text-light);
      font-size: 1rem;
    }
    .home-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .hero-preview {
      display: flex;
      align-items: center;
      gap: 16px;
      background: linear-gradient(135deg, #fff8df, #eef8ff);
    }
    .hero-preview-stage {
      width: 120px;
      min-height: 112px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero-preview-meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .hero-preview-name {
      font-size: 1.15rem;
      font-weight: 700;
    }
    .hero-preview-desc {
      color: var(--color-text-light);
      font-weight: 700;
      font-size: 0.9rem;
    }
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .form-label {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--color-text);
    }
    .avatar-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .avatar-btn {
      padding: 12px 10px;
      border: 3px solid transparent;
      border-radius: 18px;
      background: #f5f0e8;
      cursor: pointer;
      transition: border-color 0.15s, transform 0.1s, background 0.15s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .avatar-btn:hover {
      background: #ffe8b0;
      transform: translateY(-2px);
    }
    .avatar-btn.selected {
      border-color: var(--color-primary);
      background: #fff3d0;
      transform: translateY(-2px);
    }
    .avatar-mini {
      width: 88px;
      min-height: 74px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-name {
      font-weight: 700;
      color: var(--color-text);
      font-size: 0.88rem;
    }
    .start-btn {
      width: 100%;
      margin-top: 4px;
    }
  `,document.head.appendChild(e)}export{C as mount};
