/* =========================================================
   GRAD-004 — FINAL THESIS
   DATA
========================================================= */

const GRADUATION = {

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

  thesisCode:
    "TH-2027-04",

  chapterQuote:
    "لم تكن السنوات مجرد وقت مضى بل كانت الطريق الذي صنع هذه اللحظة",

  tagline:
    "اليوم نغلق صفحة الدراسة ونفتح صفحة جديدة تستحق أن نحتفل بها معكم",

  invitationText:
    "نتشرف بدعوتكم لمشاركتنا فرحة التخرج والاحتفال بختام هذه الرحلة الأكاديمية",

  hostType:
    "graduate",

  hostName:
    "أحمد محمد",

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",

  venue:
    "القاعة الكبرى للاحتفالات",

  address:
    "الموصل، نينوى",

  city:
    "الموصل",

  country:
    "العراق",

  mapsUrl:
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
   INIT
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
   DATA
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
    dateFormatter.format(
      date
    );


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(
      date
    );


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
   MAPS
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
    encodeURIComponent(
      query
    )
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
    URL.createObjectURL(
      blob
    );


  const anchor =
    document.createElement(
      "a"
    );


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

    if (
      navigator.share
    ) {

      await navigator.share({
        title,
        text,
        url
      });


      showShareFeedback(
        "تمت مشاركة الدعوة بنجاح"
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
        "تم نسخ رابط الدعوة"
      );


      return;

    }


    fallbackCopy(
      url
    );


    showShareFeedback(
      "تم نسخ رابط الدعوة"
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {

      return;

    }


    try {

      fallbackCopy(
        url
      );


      showShareFeedback(
        "تم نسخ رابط الدعوة"
      );

    } catch {

      showShareFeedback(
        "يمكنك نسخ الرابط من المتصفح"
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


  clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    setTimeout(
      () => {

        shareFeedback.textContent =
          "";

      },
      3500
    );

}


/* =========================================================
   ANIMATIONS
   SAFE FOR ARABIC
========================================================= */

function setupAnimations() {

  if (
    reducedMotion ||
    typeof gsap ===
      "undefined"
  ) {

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


  /*
    IMPORTANT:
    We animate the whole title container,
    NOT individual Arabic lines.
    This prevents glyph collisions.
  */


  gsap.from(
    ".cover-copy",
    {

      opacity: 0,

      y: 18,

      duration: 0.8,

      ease:
        "power2.out"

    }
  );


  gsap.utils
    .toArray(
      ".chapter-content"
    )
    .forEach(
      section => {

        gsap.from(
          section,
          {

            opacity: 0,

            y: 24,

            duration: 0.7,

            ease:
              "power2.out",

            scrollTrigger: {

              trigger:
                section,

              start:
                "top 85%",

              once:
                true

            }

          }
        );

      }
    );


  gsap.from(
    ".final-title",
    {

      opacity: 0,

      y: 25,

      duration: 0.75,

      ease:
        "power2.out",

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


  gsap.from(
    ".next-content",
    {

      opacity: 0,

      y: 24,

      duration: 0.75,

      ease:
        "power2.out",

      scrollTrigger: {

        trigger:
          ".next-content",

        start:
          "top 84%",

        once:
          true

      }

    }
  );


  gsap.from(
    ".invitation-heading",
    {

      opacity: 0,

      y: 24,

      duration: 0.7,

      ease:
        "power2.out",

      scrollTrigger: {

        trigger:
          ".invitation-heading",

        start:
          "top 85%",

        once:
          true

      }

    }
  );


  gsap.from(
    ".invitation-document",
    {

      opacity: 0,

      y: 28,

      duration: 0.75,

      ease:
        "power2.out",

      scrollTrigger: {

        trigger:
          ".invitation-document",

        start:
          "top 87%",

        once:
          true

      }

    }
  );


  gsap.from(
    ".actions-heading",
    {

      opacity: 0,

      y: 20,

      duration: 0.7,

      ease:
        "power2.out",

      scrollTrigger: {

        trigger:
          ".actions-heading",

        start:
          "top 88%",

        once:
          true

      }

    }
  );


  gsap.utils
    .toArray(
      ".action-card"
    )
    .forEach(
      card => {

        gsap.from(
          card,
          {

            opacity: 0,

            y: 18,

            duration: 0.55,

            ease:
              "power2.out",

            scrollTrigger: {

              trigger:
                card,

              start:
                "top 94%",

              once:
                true

            }

          }
        );

      }
    );

}
