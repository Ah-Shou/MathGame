import './styles/main.css';
import type { ScreenName, NavigateParams } from './types';

const app = document.getElementById('app')!;

export function navigate(screen: ScreenName, params?: NavigateParams): void {
  app.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'screen';
  app.appendChild(container);

  switch (screen) {
    case 'home':
      import('./screens/home').then(m => m.mount(container));
      break;
    case 'map':
      import('./screens/map').then(m => m.mount(container));
      break;
    case 'battle':
      import('./screens/battle').then(m => m.mount(container, params));
      break;
    case 'profile':
      import('./screens/profile').then(m => m.mount(container));
      break;
  }
}

// Boot
import { loadPlayer, touchLogin, evaluateAchievements } from './store';
const player = loadPlayer();
if (!player || !player.nickname) {
  navigate('home');
} else {
  touchLogin(player);
  evaluateAchievements(player);
  navigate('map');
}
