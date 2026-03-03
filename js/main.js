/* ===== main.js ===== */
(function () {
  "use strict";

  /* ── 0. Canvas Particle Network Background ── */
  function initCanvas() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    let particles = [];
    const maxParticles = 50; // 밀도 조절

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    let mouse = { x: null, y: null, radius: 150 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            this.x += forceDirectionX * 0.5;
            this.y += forceDirectionY * 0.5;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.5)"; // cyan
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 43, 226, ${1 - distance / 150})`; // purple, fades by distance
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();
  }

  // 초기화 실행
  initCanvas();

  /* ── 1. 모바일 메뉴 토글 ── */
  const hamburger = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // ESC키로 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // 모바일 메뉴 내 링크 클릭 시 닫기
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          hamburger.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    });
  }

  /* ── 2. 모바일 드롭다운 토글 ── */
  var dropdownItems = document.querySelectorAll(".has-dropdown");

  dropdownItems.forEach(function (item) {
    var navLink = item.querySelector(".nav-link");

    navLink.addEventListener("click", function (e) {
      // 모바일(nav가 open 상태)에서만 토글
      if (mainNav && mainNav.classList.contains("open")) {
        e.preventDefault();
        var dropdown = item.querySelector(".dropdown");
        var isVisible = dropdown.style.display === "block";

        // 다른 드롭다운 모두 닫기
        dropdownItems.forEach(function (other) {
          var otherDropdown = other.querySelector(".dropdown");
          if (otherDropdown) otherDropdown.style.display = "";
        });

        // 현재 드롭다운 토글
        if (dropdown) {
          dropdown.style.display = isVisible ? "" : "block";
        }
      }
    });
  });

  /* ── 3. 스크롤 시 헤더 변환 ── */
  var header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  /* ── 4. 맨 위로 가기 버튼 ── */
  var scrollTopBtn = document.querySelector(".scroll-top");

  function updateScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── 스크롤 이벤트 통합 (throttle) ── */
  var ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateHeader();
          updateScrollTop();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  // 초기 실행
  updateHeader();
  updateScrollTop();

  /* ── 5. 스크롤 애니메이션 (IntersectionObserver) ── */
  var fadeElements = document.querySelectorAll(".fade-in-up");

  if (fadeElements.length > 0 && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 6. 빠른 문의 폼 처리 ── */
  var quickForm = document.getElementById("quickForm");

  if (quickForm) {
    quickForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      var name = quickForm.querySelector('[name="name"]');
      var phone = quickForm.querySelector('[name="phone"]');
      var message = quickForm.querySelector('[name="message"]');
      var submitBtn = quickForm.querySelector('button[type="submit"]');

      // 필수값 검사
      if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      // 전화번호 형식 검사
      var phonePattern = /^[\d]{2,3}-?[\d]{3,4}-?[\d]{4}$/;
      if (!phonePattern.test(phone.value.trim())) {
        alert("올바른 연락처를 입력해주세요.\n예: 010-1234-5678");
        phone.focus();
        return;
      }

      // 로딩 상태 처리
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "처리 중...";
      submitBtn.disabled = true;

      try {
        // Backend API fetch (가상 URL)
        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.value.trim(),
            phone: phone.value.trim(),
            message: message.value.trim(),
            formId: 'quickForm'
          })
        });

        if (!response.ok) {
          throw new Error('서버 응답 오류: ' + response.status);
        }

        const data = await response.json();

        // 모니터링: 액션 성공
        if (typeof posthog !== 'undefined') {
          posthog.capture('form_submitted', { form_id: 'quickForm' });
        }

        alert("문의가 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다.");
        quickForm.reset();
      } catch (error) {
        console.error("통신 오류:", error);
        alert("요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        // 백엔드 오류 발생 시 Sentry 로깅
        if (typeof Sentry !== 'undefined') {
          Sentry.captureException(error);
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ── 7. 탭 UI ── */
  var tabNavs = document.querySelectorAll(".tab-nav");

  tabNavs.forEach(function (tabNav) {
    var buttons = tabNav.querySelectorAll(".tab-btn");
    var parent = tabNav.parentElement;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tabId = btn.getAttribute("data-tab");

        // 버튼 활성화
        buttons.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        // 패널 활성화
        var panels = parent.querySelectorAll(".tab-panel");
        panels.forEach(function (panel) {
          panel.classList.remove("active");
        });

        var target = document.getElementById(tabId);
        if (target) target.classList.add("active");
      });
    });
  });

  /* ── 8. FAQ 아코디언 ── */
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // 다른 아코디언 닫기
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        var otherQ = other.querySelector(".faq-question");
        if (otherQ) otherQ.setAttribute("aria-expanded", "false");
        var otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // 현재 아코디언 토글
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ── 9. 공지사항 아코디언 ── */
  var noticeRows = document.querySelectorAll(".notice-row");

  function toggleNotice(row) {
    var titleCell = row.querySelector(".title-col");
    var content = row.getAttribute("data-content");
    var nextRow = row.nextElementSibling;

    // 이미 열린 콘텐츠가 있으면 닫기
    if (nextRow && nextRow.classList.contains("notice-content")) {
      nextRow.remove();
      if (titleCell) titleCell.setAttribute("aria-expanded", "false");
      return;
    }

    // 다른 열린 콘텐츠 닫기
    document.querySelectorAll(".notice-content").forEach(function (el) {
      el.remove();
    });
    document.querySelectorAll(".title-col").forEach(function (el) {
      el.setAttribute("aria-expanded", "false");
    });

    // 새 콘텐츠 행 생성
    var contentRow = document.createElement("tr");
    contentRow.classList.add("notice-content", "open");
    contentRow.innerHTML =
      '<td colspan="3" style="padding: var(--space-lg) var(--space-md); background: var(--color-bg-light); line-height: 1.8;">' +
      content +
      "</td>";
    row.after(contentRow);
    if (titleCell) titleCell.setAttribute("aria-expanded", "true");
  }

  noticeRows.forEach(function (row) {
    var titleCell = row.querySelector(".title-col");
    if (!titleCell) return;

    titleCell.addEventListener("click", function () {
      toggleNotice(row);
    });

    // 키보드 접근성 (Enter, Space)
    titleCell.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleNotice(row);
      }
    });
  });

  /* ── 10. 사이드 네비 active 자동 업데이트 ── */
  var sideNav = document.querySelector(".side-nav");

  if (sideNav) {
    var sideLinks = sideNav.querySelectorAll('a[href^="#"]');
    var sectionIds = [];

    sideLinks.forEach(function (link) {
      var id = link.getAttribute("href").substring(1);
      if (id) sectionIds.push(id);
    });

    if (sectionIds.length > 0 && "IntersectionObserver" in window) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.id;
              sideLinks.forEach(function (link) {
                link.classList.toggle(
                  "active",
                  link.getAttribute("href") === "#" + id,
                );
              });
            }
          });
        },
        {
          rootMargin: "-80px 0px -60% 0px",
          threshold: 0,
        },
      );

      sectionIds.forEach(function (id) {
        var section = document.getElementById(id);
        if (section) sectionObserver.observe(section);
      });
    }
  }

  /* ── 11. 범용 폼 유효성 검사 ── */
  var forms = document.querySelectorAll(
    "#applyForm, #dispatchForm, #inquiryForm",
  );
  var phonePattern = /^[\d]{2,3}-?[\d]{3,4}-?[\d]{4}$/;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(function (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');

      // 필수 필드 검사
      var requiredFields = form.querySelectorAll("[required]");
      var valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = "var(--color-danger)";
        } else {
          field.style.borderColor = "";
        }
      });

      if (!valid) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }

      // 전화번호 검사
      var phoneField = form.querySelector('[name="phone"]');
      if (
        phoneField &&
        phoneField.value.trim() &&
        !phonePattern.test(phoneField.value.trim())
      ) {
        alert("올바른 연락처를 입력해주세요.\n예: 010-1234-5678");
        phoneField.focus();
        return;
      }

      // 이메일 검사
      var emailField = form.querySelector('[name="email"]');
      if (
        emailField &&
        emailField.value.trim() &&
        !emailPattern.test(emailField.value.trim())
      ) {
        alert("올바른 이메일 주소를 입력해주세요.");
        emailField.focus();
        return;
      }

      // 파견 폼일 경우 특별 처리 (UI 업데이트)
      const isDispatchForm = form.id === "dispatchForm";

      // 로딩 상태 처리
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "처리 중...";
      submitBtn.disabled = true;

      try {
        // FormData 수집
        const formData = new FormData(form);
        const requestData = Object.fromEntries(formData.entries());
        requestData.formId = form.id;

        // Backend API fetch (가상 URL)
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error('서버 응답 오류: ' + response.status);
        }

        const data = await response.json();

        // 모니터링: 액션 성공
        if (typeof posthog !== 'undefined') {
          posthog.capture('form_submitted', { form_id: form.id });
        }

        if (isDispatchForm) {
          // AI 매칭 결과 리포트 표시
          const resultSection = document.getElementById("aiMatchingResult");
          if (resultSection) {
            resultSection.style.display = "block";
            // 간단 스크롤 이동
            resultSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            alert("파견 신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.");
          }
        } else {
          alert("신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.");
        }
        form.reset();
      } catch (error) {
        console.error("통신 오류:", error);
        alert("요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        // 백엔드 오류 발생 시 Sentry 로깅
        if (typeof Sentry !== 'undefined') {
          Sentry.captureException(error);
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });

  /* ── 12. AI 온라인 시험 응시 UI 처리 (education.html) ── */
  var startExamBtn = document.getElementById("startExamBtn");
  var aiExamSection = document.getElementById("aiExamSection");
  var submitExamBtn = document.getElementById("submitExamBtn");

  if (startExamBtn && aiExamSection) {
    startExamBtn.addEventListener("click", function () {
      aiExamSection.style.display = aiExamSection.style.display === "none" ? "block" : "none";
      if (aiExamSection.style.display === "block") {
        aiExamSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (submitExamBtn) {
    submitExamBtn.addEventListener("click", async function () {
      var originalText = submitExamBtn.textContent;
      submitExamBtn.textContent = "채점 중...";
      submitExamBtn.disabled = true;

      try {
        // AI 모델에 답안 전송 및 결과 확인 (Simulate)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (typeof posthog !== 'undefined') {
          posthog.capture('exam_submitted', { form_id: 'aiExamForm' });
        }
        
        alert("시험 답안이 제출되었습니다. 담당자가 확인 후 연락드리겠습니다.");
        aiExamSection.style.display = "none";
      } catch (error) {
        alert("제출 중 오류가 발생했습니다.");
        if (typeof Sentry !== 'undefined') {
          Sentry.captureException(error);
        }
      } finally {
        submitExamBtn.textContent = originalText;
        submitExamBtn.disabled = false;
      }
    });
  }

})();
