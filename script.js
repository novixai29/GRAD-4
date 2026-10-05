/* =========================================================
   GRAD-004 — THE FINAL THESIS

   غيّر بيانات الزبون من هذا القسم فقط.
========================================================= */

const GRADUATION = {

  /* =========================
     الخريج
  ========================= */

  graduateName:
    "أحمد محمد",

  degree:
    "ماجستير إدارة أعمال",

  faculty:
    "كلية الإدارة والاقتصاد",

  department:
    "إدارة الأعمال",

  university:
    "جامعة الموصل",

  classYear:
    "دفعة ٢٠٢٧",

  honors:
    "",


  /* =========================
     الرسالة
  ========================= */

  thesisCode:
    "TH-2027-04",

  chapterQuote:
    "لم تكن السنوات مجرد وقت مضى، بل كانت الطريق الذي صنع هذه اللحظة.",

  tagline:
    "اليوم نغلق صفحة الدراسة، ونفتح صفحة جديدة تستحق أن نحتفل بها معكم.",

  invitationText:
    "نتشرف بدعوتكم لمشاركتنا فرحة التخرج والاحتفال بختام هذه الرحلة الأكاديمية.",


  /* =========================
     المضيف
  ========================= */

  hostType:
    "graduate",

  hostName:
    "أحمد محمد",


  /* =========================
     التاريخ
  ========================= */

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",


  /* =========================
     المكان
  ========================= */

  venue:
    "القاعة الكبرى للاحتفالات",

  address:
    "الموصل، نينوى",

  city:
    "الموصل",

  country:
    "العراق",


  /* =========================
     الروابط
  ========================= */

  mapsUrl:
    "",

  universityUrl:
    "",

  shareUrl:
    ""

};


/* =========================================================
   ELEMENTS
========================================================= */

const mapsButton =
  document.getElementById(
    "mapsButton"
  );

const calendarButton =
  document.getElementById(
    "calendarButton"
  );

const shareButton =
  document.getElementById(
    "shareButton"
  );

const shareFeedback =
  document.getElementById(
    "shareFeedback"
  );

const departmentRow =
  document.getElementById(
    "departmentRow"
  );

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initialize
);


function initialize() {

  applyData();

  setupDate();

  setupMaps();

  setupCalendar();

  setupShare();

  setupAnimations();

}


/* =========================================================
   DYNAMIC DATA
========================================================= */

function applyData() {

  const fields = {

    graduateName:
      GRADUATION.graduateName,

    degree:
      GRADUATION.degree,

    faculty:
      GRADUATION.faculty,

    department:
      GRADUATION.department,

    university:
      GRADUATION.university,

    classYear:
      GRADUATION.classYear,

    thesisCode:
      GRADUATION.thesisCode,

    chapterQuote:
      GRADUATION.chapterQuote,

    tagline:
      GRADUATION.tagline,

    invitationText:
      GRADUATION.invitationText,

    venue:
      GRADUATION.venue

  };


  Object.entries(fields)
    .forEach(
      ([field, value]) => {

        document
          .querySelectorAll(
            `[data-field="${field}"]`
          )
          .forEach(
            element => {

              element.textContent =
                value || "—";

            }
          );

      }
    );


  if (
    !GRADUATION.department ||
    !GRADUATION.department.trim()
  ) {

    departmentRow.hidden =
      true;

  }


  document.title =
    `${GRADUATION.graduateName} — دعوة حفل التخرج`;


  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );


  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );


  if (ogTitle) {

    ogTitle.setAttribute(
      "content",
      `${GRADUATION.graduateName} — دعوة حفل التخرج`
    );

  }


  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      GRADUATION.invitationText
    );

  }

}


/* =========================================================
   DATE
========================================================= */

function setupDate() {

  const date =
    new Date(
      GRADUATION.startAt
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return;

  }


  const dateFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-nu-arab",
      {

        weekday:
          "long",

        day:
          "numeric",

        month:
          "long",

        year:
          "numeric",

        timeZone:
          GRADUATION.timeZone

      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-nu-arab",
      {

        hour:
          "numeric",

        minute:
          "2-digit",

        hour12:
          true,

        timeZone:
          GRADUATION.timeZone

      }
    );


  document.getElementById(
    "formattedDate"
  ).textContent =
    dateFormatter.format(date);


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(date);


  document.getElementById(
    "fullAddress"
  ).textContent =
    [
      GRADUATION.address,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join("، ");

}


/* =========================================================
   GOOGLE MAPS
========================================================= */

function setupMaps() {

  mapsButton.href =
    getMapsUrl();

}


function getMapsUrl() {

  if (
    GRADUATION.mapsUrl &&
    GRADUATION.mapsUrl.trim()
  ) {

    return GRADUATION.mapsUrl;

  }


  const query =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}


/* =========================================================
   CALENDAR
========================================================= */

function setupCalendar() {

  calendarButton.addEventListener(
    "click",
    downloadCalendar
  );

}


function downloadCalendar() {

  const start =
    new Date(
      GRADUATION.startAt
    );


  const end =
    new Date(
      GRADUATION.endAt
    );


  if (
    Number.isNaN(
      start.getTime()
    ) ||
    Number.isNaN(
      end.getTime()
    )
  ) {

    return;

  }


  const title =
    `احتفال تخرج ${GRADUATION.graduateName}`;


  const location =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join("، ");


  const shareUrl =
    getShareUrl();


  const description =
    [
      GRADUATION.invitationText,
      GRADUATION.degree,
      GRADUATION.university,
      shareUrl
        ? `رابط الدعوة: ${shareUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//InviteUs//FinalThesis//AR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@inviteus.party
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${escapeICS(title)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(shareUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const anchor =
    document.createElement("a");


  anchor.href =
    url;


  anchor.download =
    "graduation-invitation.ics";


  document.body.appendChild(
    anchor
  );


  anchor.click();


  anchor.remove();


  URL.revokeObjectURL(
    url
  );

}


function formatICSDate(
  date
) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICS(
  value = ""
) {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    )

    .replace(
      /\n/g,
      "\\n"
    );

}


/* =========================================================
   SHARE
========================================================= */

function setupShare() {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const title =
    `${GRADUATION.graduateName} — دعوة حفل التخرج`;


  const text =
    `${GRADUATION.invitationText} ${GRADUATION.graduateName} — ${GRADUATION.classYear}`;


  const url =
    getShareUrl();


  try {

    if (navigator.share) {

      await navigator.share({
        title,
        text,
        url
      });


      showShareFeedback(
        "تمت مشاركة الدعوة بنجاح."
      );


      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        url
      );


      showShareFeedback(
        "تم نسخ رابط الدعوة."
      );


      return;

    }


    fallbackCopy(url);


    showShareFeedback(
      "تم نسخ رابط الدعوة."
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {

      return;

    }


    try {

      fallbackCopy(url);


      showShareFeedback(
        "تم نسخ رابط الدعوة."
      );

    } catch {

      showShareFeedback(
        "يمكنك نسخ رابط الدعوة من المتصفح."
      );

    }

  }

}


function getShareUrl() {

  if (
    GRADUATION.shareUrl &&
    GRADUATION.shareUrl.trim()
  ) {

    return GRADUATION.shareUrl;

  }


  return window.location.href;

}


function fallbackCopy(
  value
) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    value;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  document.execCommand(
    "copy"
  );


  textarea.remove();

}


function showShareFeedback(
  message
) {

  shareFeedback.textContent =
    message;


  window.clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    window.setTimeout(
      () => {

        shareFeedback.textContent =
          "";

      },
      3500
    );

}


/* =========================================================
   GSAP / SCROLLTRIGGER
========================================================= */

function setupAnimations() {

  if (
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {

    showEverythingImmediately();

    return;

  }


  if (
    typeof ScrollTrigger !==
      "undefined"
  ) {

    gsap.registerPlugin(
      ScrollTrigger
    );

  }


  /* =========================
     COVER
  ========================= */

  gsap.from(
    ".cover-copy h1",
    {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }
  );


  gsap.from(
    ".cover-copy p",
    {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.25,
      ease: "power2.out"
    }
  );


  /* =========================
     CHAPTER TITLES
  ========================= */

  gsap.utils
    .toArray(
      ".reveal-title"
    )
    .forEach(
      title => {

        const children =
          Array.from(
            title.children
          );


        gsap.from(
          title,
          {

            yPercent: 20,

            opacity: 0,

            duration: 0.85,

            ease:
              "power3.out",

            scrollTrigger: {

              trigger:
                title,

              start:
                "top 82%",

              once:
                true

            }

          }
        );


        if (
          children.length
        ) {

          gsap.from(
            children,
            {

              clipPath:
                "inset(0 0 100% 0)",

              y: 18,

              duration: 0.9,

              ease:
                "power3.out",

              scrollTrigger: {

                trigger:
                  title,

                start:
                  "top 82%",

                once:
                  true

              }

            }
          );

        }

      }
    );


  /* =========================
     PARAGRAPHS
  ========================= */

  gsap.utils
    .toArray(
      ".chapter-lead, .chapter-note, .editorial-quote"
    )
    .forEach(
      element => {

        gsap.from(
          element,
          {

            y: 28,

            opacity: 0,

            duration: 0.75,

            scrollTrigger: {

              trigger:
                element,

              start:
                "top 88%",

              once:
                true

            }

          }
        );

      }
    );


  /* =========================
     ACHIEVEMENT ROWS
  ========================= */

  gsap.utils
    .toArray(
      ".achievement-row"
    )
    .forEach(
      (row, index) => {

        gsap.from(
          row,
          {

            x: 25,

            opacity: 0,

            duration: 0.55,

            delay:
              index * 0.04,

            scrollTrigger: {

              trigger:
                row,

              start:
                "top 90%",

              once:
                true

            }

          }
        );

      }
    );


  /* =========================
     FINAL CHAPTER
  ========================= */

  gsap.fromTo(
    ".final-chapter__line",
    {
      scaleX: 0
    },
    {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.out",

      scrollTrigger: {

        trigger:
          ".final-chapter",

        start:
          "top 65%",

        once:
          true

      }
    }
  );


  gsap.from(
    ".final-title",
    {

      yPercent: 18,

      opacity: 0,

      duration: 1,

      ease:
        "power3.out",

      scrollTrigger: {

        trigger:
          ".final-title",

        start:
          "top 82%",

        once:
          true

      }

    }
  );


  /* =========================
     NEXT CHAPTER
  ========================= */

  gsap.from(
    "#nextChapterTitle",
    {

      clipPath:
        "inset(0 0 100% 0)",

      y: 30,

      duration: 1.1,

      ease:
        "power3.out",

      scrollTrigger: {

        trigger:
          "#nextChapterTitle",

        start:
          "top 80%",

        once:
          true

      }

    }
  );


  gsap.from(
    ".next-chapter__rule",
    {

      scaleX: 0,

      transformOrigin:
        "right center",

      duration: 1,

      scrollTrigger: {

        trigger:
          ".next-chapter__rule",

        start:
          "top 88%",

        once:
          true

      }

    }
  );


  /* =========================
     INVITATION DOCUMENT
  ========================= */

  gsap.from(
    ".invitation-document",
    {

      y: 50,

      opacity: 0,

      duration: 0.9,

      ease:
        "power2.out",

      scrollTrigger: {

        trigger:
          ".invitation-document",

        start:
          "top 82%",

        once:
          true

      }

    }
  );


  /* =========================
     ACTIONS
  ========================= */

  gsap.utils
    .toArray(
      ".action-card"
    )
    .forEach(
      card => {

        gsap.from(
          card,
          {

            y: 20,

            opacity: 0,

            duration: 0.6,

            scrollTrigger: {

              trigger:
                card,

              start:
                "top 92%",

              once:
                true

            }

          }
        );

      }
    );

}


/* =========================================================
   REDUCED MOTION FALLBACK
========================================================= */

function showEverythingImmediately() {

  const animated =
    document.querySelectorAll(
      [
        ".cover-copy h1",
        ".cover-copy p",
        ".reveal-title",
        ".chapter-lead",
        ".chapter-note",
        ".editorial-quote",
        ".achievement-row",
        ".final-title",
        "#nextChapterTitle",
        ".invitation-document",
        ".action-card"
      ].join(",")
    );


  animated.forEach(
    element => {

      element.style.opacity =
        "1";


      element.style.transform =
        "none";


      element.style.clipPath =
        "none";

    }
  );

}
