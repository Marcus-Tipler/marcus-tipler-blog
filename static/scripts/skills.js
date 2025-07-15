const badges = [
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "SQL", icon: "🗄️", desc: "Database Wizard" },
    { label: "CSS", icon: "🎨", desc: "Style Guru" },
    { label: "JavaScript", icon: "📟", desc: "Code Sorcerer" },
    { label: "Python", icon: "🐍", desc: "Script Master" },
    { label: "HTML", icon: "📄", desc: "Markup Pro" }
    ];

    // Physics parameters
    const gravity = 0.7, friction = 0.98, bounce = 0.7;
    const badgeObjs = [];
    const area = document.getElementById('badgeArea');
    const areaRect = { width: window.innerWidth, height: window.innerHeight };

    // Create badges
    badges.forEach((badge, i) => {
      const el = document.createElement('div');
      el.className = 'badge';
      el.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-label">${badge.label}</div>
        <div class="badge-desc">${badge.desc}</div>
      `;
      // Random initial position
      let x = 60 + i * 120;
      let y = 80 + Math.random() * 120;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      area.appendChild(el);
      badgeObjs.push({
        el,
        x, y,
        vx: 0,
        vy: 0,
        width: 100,
        height: 120,
        isDragging: false,
        offsetX: 0,
        offsetY: 0
      });
    });

    // Drag logic
    badgeObjs.forEach(badge => {
      badge.el.addEventListener('mousedown', (e) => {
        badge.isDragging = true;
        badge.vx = badge.vy = 0;
        badge.offsetX = e.clientX - badge.x;
        badge.offsetY = e.clientY - badge.y;
        badge.el.style.zIndex = 10;
      });
    });

    document.addEventListener('mousemove', (e) => {
      badgeObjs.forEach(badge => {
        if (badge.isDragging) {
          badge.x = e.clientX - badge.offsetX;
          badge.y = e.clientY - badge.offsetY;
        }
      });
    });

    document.addEventListener('mouseup', () => {
      badgeObjs.forEach(badge => {
        if (badge.isDragging) {
          badge.isDragging = false;
          badge.el.style.zIndex = 2;
        }
      });
    });

    // Physics and collision
    function animate() {
      badgeObjs.forEach((badge, i) => {
        if (!badge.isDragging) {
          badge.vy += gravity;
          badge.vx *= friction;
          badge.vy *= friction;
          badge.x += badge.vx;
          badge.y += badge.vy;

          // Wall collision
          if (badge.x < 0) { badge.x = 0; badge.vx = -badge.vx * bounce; }
          if (badge.x > areaRect.width - badge.width) { badge.x = areaRect.width - badge.width; badge.vx = -badge.vx * bounce; }
          if (badge.y > areaRect.height - badge.height) { badge.y = areaRect.height - badge.height; badge.vy = -badge.vy * bounce; }
          if (badge.y < 0) { badge.y = 0; badge.vy = -badge.vy * bounce; }
        }

        // Collision with other badges
        for (let j = i + 1; j < badgeObjs.length; j++) {
          const other = badgeObjs[j];
          if (badge === other) continue;
          if (rectsOverlap(badge, other)) {
            resolveCollision(badge, other);
          }
        }

        badge.el.style.left = badge.x + 'px';
        badge.el.style.top = badge.y + 'px';
      });
      requestAnimationFrame(animate);
    }

    function rectsOverlap(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    // Simple elastic collision response
    function resolveCollision(a, b) {
      // Only move if not dragging
      if (a.isDragging || b.isDragging) return;
      // Calculate overlap
      const dx = (a.x + a.width / 2) - (b.x + b.width / 2);
      const dy = (a.y + a.height / 2) - (b.y + b.height / 2);
      const overlapX = (a.width + b.width) / 2 - Math.abs(dx);
      const overlapY = (a.height + b.height) / 2 - Math.abs(dy);

      if (overlapX > 0 && overlapY > 0) {
        // Push badges apart
        if (overlapX < overlapY) {
          const push = overlapX / 2;
          a.x += dx > 0 ? push : -push;
          b.x += dx > 0 ? -push : push;
          a.vx = -a.vx * bounce;
          b.vx = -b.vx * bounce;
        } else {
          const push = overlapY / 2;
          a.y += dy > 0 ? push : -push;
          b.y += dy > 0 ? -push : push;
          a.vy = -a.vy * bounce;
          b.vy = -b.vy * bounce;
        }
      }
    }

    animate();
    window.addEventListener('resize', () => {
      areaRect.width = window.innerWidth;
      areaRect.height = window.innerHeight;
    });