import{l as i,s as f,c as u,n as v}from"./index-DL5ioRz0.js";const c=["🦊","🐼","🐸","🦁","🐯","🐨","🐻","🐰","🐮","🐷","🦄","🐙"];function g(e){const r=i(),d=(r==null?void 0:r.nickname)??"",n=(r==null?void 0:r.avatar)??c[0];e.innerHTML=`
    <div class="home-screen">
      <div class="home-hero">
        <div class="home-title-emoji float">🌟</div>
        <h1 class="home-title">小小数学探险家</h1>
        <p class="home-subtitle">开始你的数学冒险之旅！</p>
      </div>

      <div class="home-form card">
        <div class="form-section">
          <label class="form-label">选择你的头像</label>
          <div class="avatar-grid" id="avatarGrid">
            ${c.map(t=>`
              <button class="avatar-btn${t===n?" selected":""}" data-avatar="${t}" type="button">${t}</button>
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
            value="${d}"
          />
        </div>

        <button class="btn btn-primary btn-lg start-btn" id="startBtn" type="button">
          出发冒险！🚀
        </button>
      </div>
    </div>
  `,b();let s=n;const l=e.querySelector("#avatarGrid");l.addEventListener("click",t=>{const a=t.target.closest(".avatar-btn");a&&(s=a.dataset.avatar,l.querySelectorAll(".avatar-btn").forEach(p=>p.classList.remove("selected")),a.classList.add("selected"))});const m=e.querySelector("#startBtn"),o=e.querySelector("#nicknameInput");m.addEventListener("click",()=>{const t=o.value.trim();if(t.length<2){o.classList.add("shake"),o.focus(),setTimeout(()=>o.classList.remove("shake"),400);return}const a=i();a?(a.nickname=t,a.avatar=s,f(a)):u(t,s),v("map")})}function b(){if(document.getElementById("home-styles"))return;const e=document.createElement("style");e.id="home-styles",e.textContent=`
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
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }
    .avatar-btn {
      aspect-ratio: 1;
      font-size: 1.6rem;
      border: 3px solid transparent;
      border-radius: 12px;
      background: #f5f0e8;
      cursor: pointer;
      transition: border-color 0.15s, transform 0.1s, background 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-btn:hover {
      background: #ffe8b0;
      transform: scale(1.1);
    }
    .avatar-btn.selected {
      border-color: var(--color-primary);
      background: #fff3d0;
      transform: scale(1.1);
    }
    .start-btn {
      width: 100%;
      margin-top: 4px;
    }
  `,document.head.appendChild(e)}export{g as mount};
