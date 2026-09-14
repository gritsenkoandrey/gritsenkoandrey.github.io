(function () {
  var canvas = document.getElementById('pong');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W = canvas.width;
  var H = canvas.height;

  var scorePlayerEl = document.getElementById('scorePlayer');
  var scoreAiEl = document.getElementById('scoreAi');
  var restartBtn = document.getElementById('pongRestart');
  var startBtn = document.getElementById('pongStart');

  var PADDLE_W = 10;
  var PADDLE_H = 70;
  var PADDLE_MARGIN = 16;
  var BALL_R = 7;
  var WIN_SCORE = 3;
  var PLAYER_KEY_SPEED = 480;
  var AI_SPEED = 210;
  var AI_REACTION_ERROR = 30;
  var AI_REACT_INTERVAL = 0.20;
  var BASE_SPEED = 280;
  var HIT_SPEED_MULTIPLIER = 1.12;
  var MAX_SPEED = 780;
  var TRAIL_LENGTH = 18;
  var AI_PADDLE_X = W - PADDLE_MARGIN - PADDLE_W;

  var trail = [];
  var aiTargetY = H / 2;
  var aiReactTimer = 0;

  var SERVE_STAGES = ['3', '2', '1', 'GO!'];
  var SERVE_STAGE_DURATION = 0.5;
  var serveStageIndex = -1;
  var serveTimer = 0;
  var serveDirection = 1;

  var TRAIL_COLOR_NEUTRAL = '#ffe37a';
  var TRAIL_COLOR_PLAYER = '#23f0ff';
  var TRAIL_COLOR_AI = '#ff2fb0';
  var lastHitBy = null;

  var particles = [];

  function spawnBurst(x, y, color, count, speedMin, speedMax, life) {
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = speedMin + Math.random() * (speedMax - speedMin);
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: life,
        maxLife: life,
        color: color,
        size: 1.4 + Math.random() * 1.8
      });
    }
  }

  function updateParticles(dt) {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.life -= dt;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var t = Math.max(p.life / p.maxLife, 0);
      ctx.globalAlpha = t;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.4 + 0.6 * t), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function predictBallY(ballX, ballY, vx, vy, targetX) {
    if (vx <= 0) return H / 2;
    var t = (targetX - ballX) / vx;
    var predictedY = ballY + vy * t;
    var lo = BALL_R, hi = H - BALL_R;
    var range = hi - lo;
    var period = 2 * range;
    var y = (predictedY - lo) % period;
    if (y < 0) y += period;
    if (y > range) y = period - y;
    return y + lo;
  }

  var state = {
    playerY: H / 2 - PADDLE_H / 2,
    aiY: H / 2 - PADDLE_H / 2,
    ballX: W / 2,
    ballY: H / 2,
    ballVX: 0,
    ballVY: 0,
    playerScore: 0,
    aiScore: 0,
    over: false,
    started: false,
    paused: false
  };

  function isPlayable() {
    return state.started && !state.over && !state.paused;
  }

  function updateScoreDisplay() {
    scorePlayerEl.textContent = state.playerScore;
    scoreAiEl.textContent = state.aiScore;
  }

  function beginServe(direction) {
    state.ballX = W / 2;
    state.ballY = H / 2;
    state.ballVX = 0;
    state.ballVY = 0;
    trail.length = 0;
    serveDirection = direction;
    serveStageIndex = 0;
    serveTimer = SERVE_STAGE_DURATION;
    lastHitBy = null;
    spawnBurst(W / 2, H / 2, '#ffe37a', 18, 60, 160, 0.5);
  }

  function resetGame() {
    state.playerY = H / 2 - PADDLE_H / 2;
    state.aiY = H / 2 - PADDLE_H / 2;
    state.playerScore = 0;
    state.aiScore = 0;
    state.over = false;
    state.paused = false;
    canvas.classList.add('is-playing');
    beginServe(Math.random() < 0.5 ? -1 : 1);
    updateScoreDisplay();
  }

  function startGame() {
    if (state.started) return;
    state.started = true;
    state.paused = false;
    startBtn.hidden = true;
    canvas.classList.add('is-playing');
    beginServe(Math.random() < 0.5 ? -1 : 1);
  }

  function tr(key, fallback) {
    return window.i18n ? window.i18n.t(key) : fallback;
  }

  function pauseGame() {
    if (!state.started || state.over || state.paused) return;
    state.paused = true;
    canvas.classList.remove('is-playing');
    startBtn.setAttribute('data-i18n', 'game.resume');
    startBtn.textContent = tr('game.resume', '▶ Resume Game');
    startBtn.hidden = false;
  }

  function resumeGame() {
    if (!state.paused) return;
    state.paused = false;
    canvas.classList.add('is-playing');
    startBtn.hidden = true;
  }

  function setPlayerY(clientY) {
    var rect = canvas.getBoundingClientRect();
    if (!rect.height) return;
    var scale = H / rect.height;
    var y = (clientY - rect.top) * scale;
    state.playerY = Math.min(Math.max(y - PADDLE_H / 2, 0), H - PADDLE_H);
  }

  canvas.addEventListener('mousemove', function (e) {
    if (!isPlayable()) return;
    setPlayerY(e.clientY);
  });

  canvas.addEventListener('touchmove', function (e) {
    if (isPlayable() && e.touches && e.touches[0]) setPlayerY(e.touches[0].clientY);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchstart', function (e) {
    if (state.paused) resumeGame();
    else if (!state.started) startGame();
    else if (state.over) resetGame();
    if (isPlayable() && e.touches && e.touches[0]) setPlayerY(e.touches[0].clientY);
    e.preventDefault();
  }, { passive: false });

  var keys = {};
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      keys[e.key] = true;
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') keys[e.key] = false;
  });

  canvas.addEventListener('click', function () {
    if (state.paused) resumeGame();
    else if (!state.started) startGame();
    else if (state.over) resetGame();
  });

  startBtn.addEventListener('click', function () {
    if (state.paused) resumeGame();
    else startGame();
  });

  restartBtn.addEventListener('click', function () {
    state.started = true;
    state.paused = false;
    startBtn.hidden = true;
    resetGame();
  });

  function checkWin() {
    if (state.playerScore >= WIN_SCORE || state.aiScore >= WIN_SCORE) {
      state.over = true;
      canvas.classList.remove('is-playing');
    }
  }

  function update(dt) {
    updateParticles(dt);
    if (!isPlayable()) return;

    if (keys.ArrowUp) state.playerY -= PLAYER_KEY_SPEED * dt;
    if (keys.ArrowDown) state.playerY += PLAYER_KEY_SPEED * dt;
    state.playerY = Math.min(Math.max(state.playerY, 0), H - PADDLE_H);

    var serving = serveStageIndex >= 0;
    if (serving) {
      serveTimer -= dt;
      if (serveTimer <= 0) {
        serveStageIndex++;
        if (serveStageIndex >= SERVE_STAGES.length) {
          serveStageIndex = -1;
          state.ballVX = serveDirection * BASE_SPEED;
          state.ballVY = (Math.random() * 2 - 1) * 200;
        } else {
          serveTimer = SERVE_STAGE_DURATION;
        }
      }
    }

    if (state.ballVX > 0) {
      aiReactTimer -= dt;
      if (aiReactTimer <= 0) {
        aiReactTimer = AI_REACT_INTERVAL;
        var predictedY = predictBallY(state.ballX, state.ballY, state.ballVX, state.ballVY, AI_PADDLE_X);
        aiTargetY = predictedY + (Math.random() * 2 - 1) * AI_REACTION_ERROR;
      }
    } else {
      aiTargetY = H / 2;
    }
    var aiCenter = state.aiY + PADDLE_H / 2;
    if (aiCenter < aiTargetY - 10) state.aiY += AI_SPEED * dt;
    else if (aiCenter > aiTargetY + 10) state.aiY -= AI_SPEED * dt;
    state.aiY = Math.min(Math.max(state.aiY, 0), H - PADDLE_H);

    state.ballX += state.ballVX * dt;
    state.ballY += state.ballVY * dt;

    if (state.ballY - BALL_R < 0) {
      state.ballY = BALL_R;
      state.ballVY *= -1;
    } else if (state.ballY + BALL_R > H) {
      state.ballY = H - BALL_R;
      state.ballVY *= -1;
    }

    var px = PADDLE_MARGIN;
    if (
      state.ballVX < 0 &&
      state.ballX - BALL_R < px + PADDLE_W &&
      state.ballX > px &&
      state.ballY > state.playerY - BALL_R &&
      state.ballY < state.playerY + PADDLE_H + BALL_R
    ) {
      state.ballX = px + PADDLE_W + BALL_R;
      var relP = (state.ballY - (state.playerY + PADDLE_H / 2)) / (PADDLE_H / 2);
      var speedP = Math.min(Math.abs(state.ballVX) * HIT_SPEED_MULTIPLIER, MAX_SPEED);
      state.ballVX = speedP;
      state.ballVY = relP * 260;
      lastHitBy = 'player';
      spawnBurst(state.ballX, state.ballY, '#23f0ff', 10, 40, 130, 0.35);
    }

    if (
      state.ballVX > 0 &&
      state.ballX + BALL_R > AI_PADDLE_X &&
      state.ballX < AI_PADDLE_X + PADDLE_W &&
      state.ballY > state.aiY - BALL_R &&
      state.ballY < state.aiY + PADDLE_H + BALL_R
    ) {
      state.ballX = AI_PADDLE_X - BALL_R;
      var relA = (state.ballY - (state.aiY + PADDLE_H / 2)) / (PADDLE_H / 2);
      var speedA = Math.min(Math.abs(state.ballVX) * HIT_SPEED_MULTIPLIER, MAX_SPEED);
      state.ballVX = -speedA;
      state.ballVY = relA * 260;
      lastHitBy = 'ai';
      spawnBurst(state.ballX, state.ballY, '#ff2fb0', 10, 40, 130, 0.35);
    }

    if (state.ballX < -30) {
      state.aiScore++;
      updateScoreDisplay();
      checkWin();
      if (!state.over) beginServe(1);
    } else if (state.ballX > W + 30) {
      state.playerScore++;
      updateScoreDisplay();
      checkWin();
      if (!state.over) beginServe(-1);
    }

    if (!serving) {
      trail.push({ x: state.ballX, y: state.ballY });
      if (trail.length > TRAIL_LENGTH) trail.shift();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(167,157,240,0.25)';
    ctx.setLineDash([6, 10]);
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.shadowColor = 'rgba(35,240,255,0.8)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#23f0ff';
    ctx.fillRect(PADDLE_MARGIN, state.playerY, PADDLE_W, PADDLE_H);

    ctx.shadowColor = 'rgba(255,47,176,0.8)';
    ctx.fillStyle = '#ff2fb0';
    ctx.fillRect(W - PADDLE_MARGIN - PADDLE_W, state.aiY, PADDLE_W, PADDLE_H);
    ctx.shadowBlur = 0;

    var trailColor = lastHitBy === 'player'
      ? TRAIL_COLOR_PLAYER
      : lastHitBy === 'ai'
        ? TRAIL_COLOR_AI
        : TRAIL_COLOR_NEUTRAL;

    for (var i = 0; i < trail.length; i++) {
      var progress = (i + 1) / trail.length;
      ctx.globalAlpha = progress * 0.55;
      ctx.fillStyle = trailColor;
      ctx.beginPath();
      ctx.arc(trail[i].x, trail[i].y, BALL_R * (0.5 + 0.6 * progress), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.shadowColor = 'rgba(255,227,122,0.9)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#ffe37a';
    ctx.beginPath();
    ctx.arc(state.ballX, state.ballY, BALL_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    drawParticles();

    if (serveStageIndex >= 0) {
      var stageText = SERVE_STAGES[serveStageIndex];
      var isGo = stageText === 'GO!';
      ctx.textAlign = 'center';
      ctx.shadowColor = isGo ? 'rgba(35,240,255,0.9)' : 'rgba(255,227,122,0.9)';
      ctx.shadowBlur = 18;
      ctx.fillStyle = isGo ? '#7ff9ff' : '#ffe37a';
      ctx.font = "700 " + (isGo ? 32 : 38) + "px 'Press Start 2P', monospace";
      ctx.fillText(stageText, W / 2, H / 2 - 46);
      ctx.shadowBlur = 0;
    }

    if (state.over) {
      ctx.fillStyle = 'rgba(10,7,19,0.82)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';

      var playerWon = state.playerScore > state.aiScore;
      ctx.shadowColor = playerWon ? 'rgba(35,240,255,0.85)' : 'rgba(255,47,176,0.85)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = playerWon ? '#7ff9ff' : '#ff8fe0';
      ctx.font = "700 24px 'Chakra Petch', sans-serif";
      var msg = playerWon
        ? tr('game.win', 'You win! 🎉')
        : tr('game.lose', 'AI wins — rematch?');
      ctx.fillText(msg, W / 2, H / 2 - 6);
      ctx.shadowBlur = 0;

      ctx.font = "400 14px 'Chakra Petch', sans-serif";
      ctx.fillStyle = '#a79df0';
      ctx.fillText(tr('game.replayHint', 'Click the board or press Restart to play again'), W / 2, H / 2 + 22);
    }
  }

  var lastTs = null;
  function loop(ts) {
    if (lastTs == null) lastTs = ts;
    var dt = Math.min((ts - lastTs) / 1000, 0.033);
    lastTs = ts;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  if ('IntersectionObserver' in window) {
    var visibilityObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio < 0.5) pauseGame();
      });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    visibilityObserver.observe(canvas);
  }

  updateScoreDisplay();
  requestAnimationFrame(loop);
})();
