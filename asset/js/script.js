// intro
gsap.defaults({
  ease: "none",
});

document.addEventListener("DOMContentLoaded", function () {
  let mm = gsap.matchMedia();
  const intro = gsap.timeline({});
  const introVideo = document.querySelector("#introVideo");

  gsap.set(
    ".sc-intro .headline, .sc-intro .img-headline, .sc-intro .price-area",
    { autoAlpha: 0, scale: 1.1 }
  );
  introVideo.addEventListener("ended", () => {
    intro
      .to(".sc-intro .video-box", { autoAlpha: 0 })
      .to(".sc-intro .headline", { autoAlpha: 1, scale: 1 })
      .to(".sc-intro .img-headline", { autoAlpha: 1, scale: 1 }, "-=0.25")
      .to(".sc-intro .price-area", { autoAlpha: 1, scale: 1 }, "-=0.25");
  });
  //intro

  //highlights
  gsap.set(
    ".sc-highlights .headline-typo,.sc-highlights .btn-film, .highlights-swiper .swiper-slide",
    { autoAlpha: 0, yPercent: 100, scale: 1.1 }
  );
  ScrollTrigger.create({
    trigger: ".sc-highlights",
    start: "top center",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      gsap.to(".sc-highlights .headline-typo", {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
      }); // headline 나타나기
      gsap.to(
        ".sc-highlights .btn-film",
        { autoAlpha: 1, yPercent: 0, scale: 1 },
        "-=0.25"
      ); // img-headline 나타나기
      gsap.to(
        ".highlights-swiper .swiper-slide",
        { autoAlpha: 1, yPercent: 0, scale: 1 },
        "-=0.5"
      );
      $(".sc-highlights .group-control").addClass("on");
      highlightsSwiper.update();
      highlightsSwiper.autoplay.start(); // 자동 재생 시작
      $(".sc-highlights .swiper-pagination-bullet-active").css({
        "--playstate": "running",
      });
    },
    onLeaveBack: () => {
      $(".sc-highlights .group-control").removeClass("on");
    },
    onEnterBack: () => {
      $(".sc-highlights .group-control").addClass("on");
    },
  });
  const highlightsSwiper = new Swiper(".highlights-swiper", {
    slidesPerView: 1.15,
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: true,
    pagination: {
      el: ".sc-highlights .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
      stopOnLastSlide: true,
    },
    loop: false,
    on: {
      init: function () {
        this.autoplay.stop();
        // 처음 실행
        const activeSlide = this.slides[this.activeIndex];
        // 비디오 재생
        const video = activeSlide.querySelector("video");
        if (video) {
          video.play();
        }
      },
      // 슬라이드 전환이 시작될 때 실행
      slideChangeTransitionStart: function () {
        // 모든 슬라이드의 캡션을 초기화 (숨김 상태로 변경)
        document
          .querySelectorAll(".highlights-swiper .caption")
          .forEach((caption) => {
            $(caption).css("--caption-opacity", 0);
            $(caption).css("--caption-x", "100%");
          });

        toggleControlButton("pause");
      },
      // 슬라이드 전환이 완료되었을 때 실행
      slideChangeTransitionEnd: function () {
        // 현재 활성화된 슬라이드의 캡션에 애니메이션 적용
        const activeSlide = this.slides[this.activeIndex];
        const caption = activeSlide.querySelector(".caption");
        if (caption) {
          $(caption).css("--caption-opacity", 1);
          $(caption).css("--caption-x", 0);
        }
      },
      slideChange: function () {
        // 모든 비디오 일시 정지
        document
          .querySelectorAll(".highlights-swiper video")
          .forEach((video) => {
            video.pause();
          });

        // 현재 활성화된 슬라이드의 비디오 재생
        const activeSlide = this.slides[this.activeIndex];
        const video = activeSlide.querySelector("video");
        if (video) {
          video.play();
        }
      },
      reachEnd: function () {
        //마지막 슬라이드일때
        setTimeout(() => {
          toggleControlButton("replay");
        }, 7000);
      },
    },
  });
  function toggleControlButton(state) {
    const playButton = document.querySelector(".sc-highlights .play");
    const pauseButton = document.querySelector(".sc-highlights .pause");
    const replayButton = document.querySelector(".sc-highlights .replay");

    playButton.classList.remove("active");
    pauseButton.classList.remove("active");
    replayButton.classList.remove("active");

    if (state === "play") {
      playButton.classList.add("active");

      $(".sc-highlights .swiper-pagination-bullet-active").css({
        "--playstate": "paused",
      });
    } else if (state === "pause") {
      pauseButton.classList.add("active");
      $(".sc-highlights .swiper-pagination-bullet-active").css({
        "--playstate": "running",
      });
    } else if (state === "replay") {
      replayButton.classList.add("active");
    }
  }
  // 버튼 클릭 이벤트 처리
  document
    .querySelector(".sc-highlights .btn-controls")
    .addEventListener("click", function () {
      if (document.querySelector(".sc-highlights .play.active")) {
        // play 버튼이 활성화된 경우 슬라이드 재생
        highlightsSwiper.autoplay.start();
        toggleControlButton("pause");
      } else if (document.querySelector(".sc-highlights .pause.active")) {
        // pause 버튼이 활성화된 경우 슬라이드 일시정지
        highlightsSwiper.autoplay.stop();
        toggleControlButton("play");
      } else if (document.querySelector(".sc-highlights .replay.active")) {
        // replay 버튼이 활성화된 경우 슬라이드 처음부터 재생
        highlightsSwiper.slideTo(0); // 첫 번째 슬라이드로 이동
        highlightsSwiper.autoplay.start();
        toggleControlButton("pause");
      }
    });
  //highlights
  //closer
  ScrollTrigger.create({
    trigger: ".sc-closer",
    start: "top 80%",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      $(".sc-highlights .group-control").removeClass("on");
      $(".sc-closer .group-nav").addClass("on");
    },
    onLeaveBack: () => {
      $(".sc-closer .group-nav").removeClass("on");
    },
    onEnterBack: () => {
      $(".sc-closer .group-nav").addClass("on");
    },
    onLeave: () => {
      $(".sc-closer .group-nav").removeClass("on");
    },
  });
  $(".sc-closer .product-tab-item").click(function (e) {
    tabName = $(this).data("tab");
    $(this).addClass("active").siblings().removeClass("active");
    $(tabName).addClass("on").siblings().removeClass("on");
    $(".product-name span").each(function () {
      if ($(this).data("tab-name") === tabName) {
        $(this).addClass("on").siblings().removeClass("on");
      }
    });
  });
  //closer
  //titanium
  ScrollTrigger.create({
    trigger: ".sc-titanium",
    start: "top 80%",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      $(".sc-titanium #video").get(0).play();
    },
  });
  const displaySwiper = new Swiper(".sc-titanium .display-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".sc-titanium .swiper-button-next",
      prevEl: ".sc-titanium .swiper-button-prev",
    },
  });
  //titanium

  //intelligence
  $(".sc-intelligence .gallery-tab-item button").click(function (e) {
    e.preventDefault();
    tabName = $(this).parent().data("tab");
    $(this).parent().addClass("active").siblings().removeClass("active");
    $(tabName).addClass("on").siblings().removeClass("on");
  });

  document.querySelectorAll(".gallery-item .btn-controls").forEach((button) => {
    button.addEventListener("click", function () {
      const videoElement =
        this.closest(".frame-content")?.querySelector(".inside-item"); // 비디오 요소 선택
      if (!videoElement) return; // 비디오 요소가 없는 경우 함수 종료

      videoElement.addEventListener("ended", () => {
        console.log("Video ended!"); // 동영상 끝났을 때 로그 출력
        toggleControlButton2(button, "replay"); // replay 버튼 활성화
      });

      const playButton = this.querySelector(".play");
      const pauseButton = this.querySelector(".pause");
      const replayButton = this.querySelector(".replay");

      //if (playButton && playButton.classList.contains('active')) {
      //옵셔널 체이닝(optional chaining) 연산자, 비어있는지 확인
      if (playButton?.classList.contains("active")) {
        // play 버튼이 활성화된 경우 비디오 재생
        videoElement.play();
        toggleControlButton2(this, "pause");
      } else if (pauseButton?.classList.contains("active")) {
        // pause 버튼이 활성화된 경우 비디오 일시 정지
        videoElement.pause();
        toggleControlButton2(this, "play");
      } else if (replayButton?.classList.contains("active")) {
        // replay 버튼이 활성화된 경우 비디오 처음부터 재생
        videoElement.currentTime = 0; // 비디오 처음으로 이동
        videoElement.play();
        toggleControlButton2(this, "pause");
      }
    });
  });

  function toggleControlButton2(button, state) {
    const playButton = button.querySelector(".play");
    const pauseButton = button.querySelector(".pause");
    const replayButton = button.querySelector(".replay");

    // 모든 버튼 비활성화
    playButton?.classList.remove("active");
    pauseButton?.classList.remove("active");
    replayButton?.classList.remove("active");

    // 전달된 상태에 따라 버튼 활성화
    if (state === "play") {
      playButton?.classList.add("active");
    } else if (state === "pause") {
      pauseButton?.classList.add("active");
    } else if (state === "replay") {
      replayButton?.classList.add("active");
    }
  }

  //camera
  const cameraBtn = $(".sc-camera .btn-plus");
  ScrollTrigger.create({
    trigger: ".sc-camera",
    start: "top top",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      cameraBtn.addClass("on");
    },
    onLeaveBack: () => {
      cameraBtn.removeClass("on");
    },
    onEnterBack: () => {
      cameraBtn.addClass("on");
    },
    onLeave: () => {
      cameraBtn.removeClass("on");
    },
  });

  const cameraSwiper = new Swiper(".camera-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".sc-camera .swiper-button-next",
      prevEl: ".sc-camera .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        // 모든 비디오 멈춤
        document.querySelectorAll(".camera-swiper video").forEach((video) => {
          video.pause();
          video.currentTime = 0;
        });

        // 현재 슬라이드의 비디오 재생
        const activeSlide = this.slides[this.activeIndex];
        const video = activeSlide.querySelector("video");
        if (video) {
          video.play();
        }
      },
    },
  });

  // dolby
  const dolbyBtn = $(".sc-dolby .btn-plus");
  const horseCover = gsap.timeline({
    scrollTrigger: {
      trigger: ".horse-area",
      start: "top top",
      end: "bottom bottom",
      markers: false,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  ScrollTrigger.create({
    trigger: ".sc-dolby",
    start: "top 80%",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      dolbyBtn.addClass("on");
      cameraBtn.removeClass("on");
    },
    onLeaveBack: () => {
      dolbyBtn.removeClass("on");
    },
    onEnterBack: () => {
      dolbyBtn.addClass("on");
    },
    onLeave: () => {
      dolbyBtn.removeClass("on");
    },
  });

  horseCover
    .to(".horse-area .bg-wrap", {
      "--opacity": 0,
    })
    .to(
      ".horse-area .headline",
      {
        yPercent: -200,
        autoAlpha: 0,
      },
      "<"
    )
    .to(".horse-area .bg-wrap", {
      scale: 1,
    });

  //zoom
  const zoomBtn = $(".sc-zoom .btn-plus");
  ScrollTrigger.create({
    trigger: ".sc-zoom",
    start: "top 80%",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      zoomBtn.addClass("on");
      dolbyBtn.removeClass("on");
    },
    onLeaveBack: () => {
      zoomBtn.removeClass("on");
    },
    onEnterBack: () => {
      zoomBtn.addClass("on");
    },
    onLeave: () => {
      zoomBtn.removeClass("on");
    },
  });

  const zoomCover = gsap.timeline({
    scrollTrigger: {
      trigger: ".zoom-area",
      start: "top top",
      end: "bottom bottom",
      markers: false,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  zoomCover
    .to(".zoom-area .bg-wrap", {
      "--opacity": 0,
    })
    .to(
      ".zoom-area .headline",
      {
        yPercent: -200,
        autoAlpha: 0,
      },
      "<"
    )
    .to(".zoom-area .bg-wrap", {
      scale: 1,
      marginLeft: 0,
    });

  const zoomSwiper1 = new Swiper(".zoom-swiper", {
    effect: "fade",
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true, //슬라이드 간 교차
    },
    grabCursor: false,
  });
  const zoomSwiper2 = new Swiper(".zoom-swiper2", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  $(".zoom-swiper2 .zoom-item").click(function (e) {
    e.preventDefault();
    const index = $(this).index();
    console.log(index);
    $(this).addClass("active").siblings().removeClass("active");
    zoomSwiper1.slideTo(index);
    zoomSwiper2.slideTo(index);
  });

  // next 버튼 클릭 시 active 클래스와 슬라이드 인덱스 동기화, curr 위치 업데이트
  $(".zoom-swiper2 .swiper-button-next").click(function () {
    let currentIndex = zoomSwiper1.realIndex; // 현재 슬라이드 인덱스
    currentIndex = (currentIndex + 1) % zoomSwiper1.slides.length; // 슬라이드 갯수 넘어서지 않게 처리
    updateZoomItem(currentIndex); // active 클래스 업데이트
    zoomSwiper1.slideTo(currentIndex);
    zoomSwiper2.slideTo(currentIndex);
  });

  // prev 버튼 클릭 시 active 클래스와 슬라이드 인덱스 동기화, curr 위치 업데이트
  $(".zoom-swiper2 .swiper-button-prev").click(function () {
    let currentIndex = zoomSwiper1.realIndex; // 현재 슬라이드 인덱스
    currentIndex =
      (currentIndex - 1 + zoomSwiper1.slides.length) %
      zoomSwiper1.slides.length; // 음수 인덱스 처리
    updateZoomItem(currentIndex); // active 클래스 업데이트
    zoomSwiper1.slideTo(currentIndex);
    zoomSwiper2.slideTo(currentIndex);
  });

  // active 클래스를 업데이트하는 함수
  function updateZoomItem(index) {
    $(".zoom-swiper2 .zoom-item")
      .eq(index)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }

  //photographic
  const photographic = gsap.timeline({
    scrollTrigger: {
      trigger: ".group-clip",
      start: "top top",
      end: "bottom bottom",
      markers: false,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  photographic
    .to(".group-clip .clip-item.default", {
      "--clip-progress": "100%",
    })
    .to(
      ".group-clip .frame-box",
      {
        xPercent: -100,
      },
      "<"
    )
    .to(".group-clip .clip-item.color", {
      "--clip-progress": "100%",
    })
    .to(
      ".group-clip .frame-box",
      {
        xPercent: -200,
      },
      "<"
    )
    .to(".group-clip", {
      width: "90%",
    });

  const photographicFrame = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-photographic .choose-area",
      start: "top top",
      end: "bottom bottom",
      markers: false,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
  gsap.set(".choose-area .box2", { autoAlpha: 0 });
  gsap.set(".choose-area .box3", { autoAlpha: 0 });
  photographicFrame
    .to(".choose-area .thumb1", {
      autoAlpha: 0,
    })
    .to(".choose-area .box2", { autoAlpha: 1 })
    .to(".choose-area .thumb1", {
      autoAlpha: 0,
    })
    .to(".choose-area .thumb2", {
      autoAlpha: 0,
    })
    .to(".choose-area .box3", { autoAlpha: 1 }, "<");

  // a-18
  $("#iphone-model-select").change(function () {
    tabName = $(this).find("option:selected").data("tab");
    $(tabName).addClass("on").siblings().removeClass("on");
  });
  //battery
  $("#iphone-battery-select").change(function () {
    tabName = $(this).find("option:selected").data("tab");
    $(tabName).addClass("on").siblings().removeClass("on");
  });

  // ios 18
  const iosSwiper = new Swiper(".ios-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".sc-ios18 .swiper-button-next",
      prevEl: ".sc-ios18 .swiper-button-prev",
    },
  });

  //significant
  $(".accordion-item .btn-accordion").click(function (e) {
    currentItem = $(this).parent();
    if (currentItem.hasClass("on")) {
      nextItem = currentItem.next(".accordion-item");
      currentItem.removeClass("on");

      // 마지막일때 첫ㅓㄴ째
      if (nextItem.length) {
        nextItem.addClass("on");
      } else {
        $(".accordion-item").first().addClass("on");
      }
    } else {
      $(".accordion-item").removeClass("on");
      currentItem.addClass("on");
    }
  });

  // buy
  const iphoneSwiper = new Swiper(".iphone-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".sc-buy .swiper-button-next",
      prevEl: ".sc-buy .swiper-button-prev",
    },
  });

  // iphone model explore
  const keepBtn = $(".sc-keep .btn-plus");
  ScrollTrigger.create({
    trigger: ".sc-keep",
    start: "top 80%",
    end: "bottom bottom",
    markers: false,
    onEnter: () => {
      keepBtn.addClass("on");
    },
    onLeaveBack: () => {
      keepBtn.removeClass("on");
    },
    onEnterBack: () => {
      keepBtn.addClass("on");
    },
    onLeave: () => {
      keepBtn.removeClass("on");
    },
  });

  // 동영상 반응형 적용
  // 모든 비디오 요소에 대해 소스를 업데이트하는 함수
  function updateAllVideoSources() {
    const videoElements = document.querySelectorAll("video[data-video-path]");
    videoElements.forEach(updateVideoSource);
  }

  // 특정 비디오 요소의 소스를 업데이트하는 함수
  function updateVideoSource(element) {
    const width = window.innerWidth;
    let videoFileName = "";

    // 브라우저 크기에 따라 파일명 설정
    if (width <= 480) {
      videoFileName = "xsmall.mp4";
    } else if (width <= 734) {
      videoFileName = "small.mp4";
    } else if (width <= 1068) {
      videoFileName = "medium.mp4";
    } else if (width <= 1440) {
      videoFileName = "large.mp4";
    } else {
      videoFileName = "xlarge.mp4";
    }

    // 동적으로 비디오 소스 설정
    const basePath = element.getAttribute("data-video-path");
    const newSource = `${basePath}${videoFileName}`;

    // 소스가 없거나 변경되었으면 새로운 소스 추가
    if (
      !element.querySelector("source") ||
      element.querySelector("source").src !== newSource
    ) {
      // 기존 소스 제거
      element.innerHTML = "";

      // 새로운 소스 추가
      const sourceElement = document.createElement("source");
      sourceElement.src = newSource;
      sourceElement.type = "video/mp4";
      element.appendChild(sourceElement);
      element.load(); // 비디오 로드
    }
  }

  // 윈도우 크기 변경 시 모든 비디오 소스를 업데이트
  window.addEventListener("resize", updateAllVideoSources);
  window.addEventListener("load", updateAllVideoSources);
});
