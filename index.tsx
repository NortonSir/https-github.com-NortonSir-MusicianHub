const appContainer = document.getElementById('app-container');

if (appContainer) {
  appContainer.innerHTML = `
    <div style="text-align: center; color: #333;">
      <h1 style="font-size: 2.5rem; font-weight: 600;">프로젝트가 초기화되었습니다.</h1>
      <p style="font-size: 1.2rem; color: #666;">이제 새로운 기능을 추가할 수 있습니다.</p>
    </div>
  `;
}
