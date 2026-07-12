const firebaseConfig = {
  apiKey: "AIzaSyC-sPiRNeOVvGuWm_OpAe7mHPm1QG05RVc",
  authDomain: "vien-portfolio.firebaseapp.com",
  projectId: "vien-portfolio",
  storageBucket: "vien-portfolio.firebasestorage.app",
  messagingSenderId: "533621720811",
  appId: "1:533621720811:web:1b72ad2a581bd3565920ae",
};
const firebaseContentCollection = "portfolio";
const firebaseContentDocument = "site-content";
const firebaseContactCollection = "contact-messages";
const firebaseSdkVersion = "10.12.5";
const cloudinaryCloudName = "tpwni7f3";
const cloudinaryUploadPreset = "vien_portfolio_unsigned";
let firebaseReadyPromise = null;
let firebaseServices = null;

const dashboardSeed = {
  hero: [
    {
      id: 501,
      title: "Vien Nguyen",
      owner: "I’m Vien Nguyen, a passionate UI/UX Designer focused on clarity, usability, and conversion-driven digital experiences.",
      status: "Active",
      date: "2026-07-08",
      metric: "Hero",
      tags: "Get In touch",
      link: "/contact/",
      image: "assets/images/about/me.jpg",
      summary: "100+ reviews",
      detail: {
        reviewScore: "(4.96 of 5)",
        reviewDescription: "Five-star reviews from my esteemed clients.",
        avatarOne: "assets/images/avatar/01.jpg",
        avatarTwo: "assets/images/avatar/02.jpg",
        avatarThree: "assets/images/avatar/03.jpg",
      },
    },
  ],
  projects: [
    {
      id: 1,
      title: "Mique",
      owner: "Vien Nguyen",
      status: "Active",
      date: "2026-06-25",
      metric: "1200x1000",
      tags: "Figma, Photoshop, Illustrator",
      link: "/single-project/",
      image: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?q=80&w=1200&h=1000&auto=format&fit=crop",
      summary: "A product design project focused on clear user flows, polished UI, and a scalable visual system.",
      detail: {
        role: "UI/UX Designer",
        service: "UI Design, Product Design",
      },
    },
    {
      id: 2,
      title: "SAPP Academy",
      owner: "Vien Nguyen",
      status: "Active",
      date: "2024-01-01",
      metric: "1200x1000",
      tags: "Figma, Photoshop, Illustrator",
      link: "/single-project/",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=1000&auto=format&fit=crop",
      summary: "Standardized brand guidelines and digital interfaces for a stronger education technology presence.",
      detail: {
        role: "UI Designer",
        service: "Brand Guidelines, Digital Interfaces",
      },
    },
    {
      id: 3,
      title: "Laccino",
      owner: "Vien Nguyen",
      status: "Active",
      date: "2026-06-20",
      metric: "1200x1000",
      tags: "Photoshop, Illustrator, Branding",
      link: "/single-project/",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&h=1000&auto=format&fit=crop",
      summary: "A premium brand identity and visual retouching project for a leather craft service positioned in the luxury market.",
      detail: {
        role: "UI/UX Designer",
        service: "Brand Identity, Visual Retouching",
      },
    },
    {
      id: 4,
      title: "DGolf Group",
      owner: "Vien Nguyen",
      status: "Active",
      date: "2026-06-18",
      metric: "1200x1000",
      tags: "Figma, Photoshop, Premiere Pro",
      link: "/single-project/",
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&h=1000&auto=format&fit=crop",
      summary: "High-converting landing pages and marketing visuals for an elite golf community with a modern brand presence.",
      detail: {
        role: "UI/UX Designer",
        service: "Landing Page, Marketing Assets",
      },
    },
  ],
  blog: [
    {
      id: 5,
      title: "Discovery & Strategy",
      owner: "Vien Nguyen",
      status: "Active",
      date: "2026-06-25",
      metric: "Design process",
      tags: "UX Research, Strategy",
      link: "/blog-details/",
      image: "",
      summary: "Deep dive into goals, user needs, and market trends to build a solid foundation for every project.",
    },
    {
      id: 6,
      title: "Design & Iteration",
      owner: "Vien Nguyen",
      status: "Active",
      date: "2026-06-25",
      metric: "Design process",
      tags: "Wireframing, Prototyping",
      link: "/blog-details/",
      image: "",
      summary: "Transforming concepts into high-fidelity wireframes and prototypes refined through constant feedback.",
    },
  ],
  testimonials: [
    {
      id: 7,
      title: "Product Lead at Journey",
      owner: "Michael Anderson",
      status: "Active",
      date: "2026-06-25",
      metric: "Client Review",
      tags: "Product Design, UX",
      link: "/#testimonials",
      image: "",
      summary: "Working with Vien was a game-changer for our digital product. His ability to merge high-end aesthetics with intuitive UX functionality resulted in a platform that not only looks cinematic but also significantly improved our user retention. A true professional.",
    },
    {
      id: 8,
      title: "Founder of Laccino",
      owner: "Nguyen Minh Hieu",
      status: "Active",
      date: "2026-06-25",
      metric: "Client Review",
      tags: "Brand Identity, Retouching",
      link: "/#testimonials",
      image: "",
      summary: "Working with Vien was a seamless experience. He successfully repositioned our brand identity to match the high-end luxury market. His Photoshop expertise brought our leather craft services to life with incredible detail and sophistication.",
    },
    {
      id: 9,
      title: "Brand Manager at SAPP Academy",
      owner: "Mr. Nguyen Duc Thai",
      status: "Active",
      date: "2026-06-25",
      metric: "Client Review",
      tags: "Brand Guidelines, Digital Platform",
      link: "/#testimonials",
      image: "",
      summary: "Vien is more than just a designer; he is a strategic problem solver. He helped us standardize our Brand Guidelines across all digital platforms, elevating our brand presence in the education tech space.",
    },
    {
      id: 10,
      title: "Marketing Director at DGolf Group",
      owner: "Tran Anh Tuan",
      status: "Active",
      date: "2026-06-25",
      metric: "Client Review",
      tags: "Landing Page, Marketing",
      link: "/#testimonials",
      image: "",
      summary: "Vien is a versatile powerhouse. From high-converting landing pages to creative marketing assets, he delivered everything with a modern and professional touch that resonates with our elite golf community.",
    },
  ],
  skills: [
    {
      id: 301,
      title: "Illustrator",
      owner: "Design Tool",
      status: "Active",
      date: "2026-06-28",
      metric: "1",
      tags: "Skill",
      link: "/about/#skills",
      image: "assets/images/skills/skill1.png",
      summary: "Vector illustration, icon systems, and brand assets.",
    },
    {
      id: 302,
      title: "Photoshop",
      owner: "Design Tool",
      status: "Active",
      date: "2026-06-28",
      metric: "2",
      tags: "Skill",
      link: "/about/#skills",
      image: "assets/images/skills/skill3.png",
      summary: "Image editing, retouching, and visual composition.",
    },
    {
      id: 303,
      title: "Figma",
      owner: "Design Tool",
      status: "Active",
      date: "2026-06-28",
      metric: "3",
      tags: "Skill",
      link: "/about/#skills",
      image: "assets/images/skills/skill2.png",
      summary: "Interface design, design systems, and prototyping.",
    },
    {
      id: 304,
      title: "CapCut",
      owner: "Video Editing",
      status: "Active",
      date: "2026-06-28",
      metric: "4",
      tags: "Skill",
      link: "/about/#skills",
      image: "assets/images/skills/skill4.png",
      summary: "Short-form video editing and social content.",
    },
    {
      id: 305,
      title: "Premiere Pro",
      owner: "Video Editing",
      status: "Active",
      date: "2026-06-28",
      metric: "5",
      tags: "Skill",
      link: "/about/#skills",
      image: "assets/images/skills/skill5.png",
      summary: "Video editing, motion cuts, and timeline production.",
    },
  ],
  social: [
    {
      id: 201,
      title: "Facebook",
      owner: "ri-facebook-circle-fill",
      status: "Active",
      date: "2026-06-25",
      metric: "1",
      tags: "Social",
      link: "#",
      image: "",
      summary: "Facebook profile",
    },
    {
      id: 202,
      title: "Instagram",
      owner: "ri-instagram-line",
      status: "Active",
      date: "2026-06-25",
      metric: "2",
      tags: "Social",
      link: "#",
      image: "",
      summary: "Instagram profile",
    },
    {
      id: 203,
      title: "TikTok",
      owner: "ri-tiktok-fill",
      status: "Active",
      date: "2026-06-25",
      metric: "3",
      tags: "Social",
      link: "#",
      image: "",
      summary: "TikTok profile",
    },
    {
      id: 204,
      title: "LinkedIn",
      owner: "ri-linkedin-fill",
      status: "Active",
      date: "2026-06-25",
      metric: "4",
      tags: "Social",
      link: "#",
      image: "",
      summary: "LinkedIn profile",
    },
    {
      id: 205,
      title: "GitHub",
      owner: "ri-github-line",
      status: "Active",
      date: "2026-06-25",
      metric: "5",
      tags: "Social",
      link: "#",
      image: "",
      summary: "GitHub profile",
    },
  ],
  companies: [
    {
      id: 401,
      title: "Partner 1",
      owner: "Company",
      status: "Active",
      date: "2026-07-08",
      metric: "1",
      tags: "Company",
      link: "#",
      image: "assets/images/client-logos/partner1.png",
      summary: "Company logo",
    },
    {
      id: 402,
      title: "Partner 2",
      owner: "Company",
      status: "Active",
      date: "2026-07-08",
      metric: "2",
      tags: "Company",
      link: "#",
      image: "assets/images/client-logos/partner2.png",
      summary: "Company logo",
    },
    {
      id: 403,
      title: "Partner 3",
      owner: "Company",
      status: "Active",
      date: "2026-07-08",
      metric: "3",
      tags: "Company",
      link: "#",
      image: "assets/images/client-logos/partner3.png",
      summary: "Company logo",
    },
    {
      id: 404,
      title: "Partner 4",
      owner: "Company",
      status: "Active",
      date: "2026-07-08",
      metric: "4",
      tags: "Company",
      link: "#",
      image: "assets/images/client-logos/partner4.png",
      summary: "Company logo",
    },
    {
      id: 405,
      title: "Partner 5",
      owner: "Company",
      status: "Active",
      date: "2026-07-08",
      metric: "5",
      tags: "Company",
      link: "#",
      image: "assets/images/client-logos/partner5.png",
      summary: "Company logo",
    },
  ],
  contact: [],
  logo: [],
  branding: {
    logo: "./assets/images/logo.png?v=20260711-vien-brand-assets-v1",
    favicon: "./assets/images/favicon.png?v=20260711-vien-brand-assets-v1",
  },
};

const dashboardLabels = {
  hero: {
    label: "Avata",
    singular: "Avata",
    page: "/#home",
    helper: "Update the home avata image, intro text, review, and review avatars.",
  },
  projects: {
    label: "Projects",
    singular: "Project",
    page: "/projects/",
    helper: "Manage case studies, project links, and 1200x1000px cover images.",
  },
  blog: {
    label: "Blog",
    singular: "Blog Post",
    page: "/blog/",
    helper: "Plan posts, update draft status, and connect each post to its page.",
  },
  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    page: "/#testimonials",
    helper: "Curate feedback from clients, mentors, and collaborators.",
  },
  skills: {
    label: "Skills",
    singular: "Skill",
    page: "/about/#skills",
    helper: "Manage professional skills, icons, order, and active status.",
  },
  social: {
    label: "Social",
    singular: "Social Link",
    page: "/#contact",
    helper: "Manage social profile links and icons shown on the website.",
  },
  companies: {
    label: "Companies",
    singular: "Company",
    page: "/",
    helper: "Manage logos shown in the Company I Worked With section.",
  },
  contact: {
    label: "Contact",
    singular: "Message",
    page: "/contact/",
    helper: "Review contact form messages, reply by email, and track unread requests.",
  },
  logo: {
    label: "Branding",
    singular: "Brand Asset",
    page: "/",
    helper: "Update the logo and favicon displayed across the website.",
  },
};

const dashboardContentVersion = "vien-site-hero-2026-07-08";
const dashboardVersionStorageKey = "nino-dashboard-content-version";
const dashboardStorageKey = "nino-dashboard-content";
const siteLogoStorageKey = "nino-site-logo";
const siteFaviconStorageKey = "nino-site-favicon";
const defaultSiteLogo = "./assets/images/logo.png?v=20260711-vien-brand-assets-v1";
const defaultSiteFavicon = "./assets/images/favicon.png?v=20260711-vien-brand-assets-v1";
const dashboardAuthKey = "nino-dashboard-authenticated";
const dashboardStatuses = [
  { label: "All Projects", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Disabled", value: "Disabled" },
  { label: "Draft", value: "Draft" },
];
const contactStatuses = [
  { label: "All Messages", value: "All" },
  { label: "Unread", value: "Unread" },
  { label: "Read", value: "Read" },
];
const dashboardIcons = {
  hero: "ri-home-5-line",
  projects: "ri-folder-line",
  blog: "ri-article-line",
  testimonials: "ri-chat-quote-line",
  skills: "ri-tools-line",
  social: "ri-share-line",
  companies: "ri-building-4-line",
  contact: "ri-mail-line",
  logo: "ri-image-edit-line",
};


function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function initFirebaseServices() {
  if (firebaseReadyPromise) {
    return firebaseReadyPromise;
  }

  firebaseReadyPromise = (async () => {
    await loadScriptOnce(`https://www.gstatic.com/firebasejs/${firebaseSdkVersion}/firebase-app-compat.js`);
    await loadScriptOnce(`https://www.gstatic.com/firebasejs/${firebaseSdkVersion}/firebase-auth-compat.js`);
    await loadScriptOnce(`https://www.gstatic.com/firebasejs/${firebaseSdkVersion}/firebase-firestore-compat.js`);

    if (!window.firebase) {
      throw new Error("Firebase SDK is not available.");
    }

    const app = window.firebase.apps?.length
      ? window.firebase.app()
      : window.firebase.initializeApp(firebaseConfig);
    firebaseServices = {
      app,
      auth: window.firebase.auth(),
      firestore: window.firebase.firestore(),
    };
    return firebaseServices;
  })();

  return firebaseReadyPromise;
}

function getFirebaseContentRef(firestore) {
  return firestore.collection(firebaseContentCollection).doc(firebaseContentDocument);
}

function getFirebaseContactMessagesRef(firestore) {
  return firestore.collection(firebaseContactCollection);
}

function normalizeContactMessage(message = {}, id = Date.now()) {
  const createdDate = message.createdAt?.toDate ? message.createdAt.toDate() : null;
  const fallbackDate = new Date().toISOString().slice(0, 10);
  return {
    id: Number(message.id) || Number(String(id).replace(/\D/g, "").slice(-12)) || Date.now(),
    firebaseId: String(message.firebaseId || id || ""),
    title: message.subject || message.title || "New contact message",
    owner: message.name || message.owner || "Visitor",
    email: message.email || "",
    status: message.status || "Unread",
    date: message.date || (createdDate ? createdDate.toISOString().slice(0, 10) : fallbackDate),
    metric: message.metric || "Contact form",
    tags: message.tags || "Contact",
    link: message.email ? `mailto:${message.email}` : "/contact/",
    image: "",
    summary: message.message || message.summary || "",
  };
}

async function submitContactMessageToFirebase(message) {
  const { firestore } = await initFirebaseServices();
  const payload = {
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
    status: "Unread",
    date: new Date().toISOString().slice(0, 10),
    source: window.location.href,
    createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
  };
  const doc = await getFirebaseContactMessagesRef(firestore).add(payload);
  return normalizeContactMessage({ ...payload, id: Date.now() }, doc.id);
}

async function loadContactMessagesFromFirebase() {
  try {
    const { firestore } = await initFirebaseServices();
    const snapshot = await getFirebaseContactMessagesRef(firestore)
      .orderBy("createdAt", "desc")
      .limit(100)
      .get();
    return snapshot.docs.map((doc) => normalizeContactMessage(doc.data(), doc.id));
  } catch (error) {
    console.warn("Firebase contact messages load failed.", error);
    return null;
  }
}

async function updateContactMessageInFirebase(item, updates) {
  if (!item?.firebaseId) return;
  const { firestore } = await initFirebaseServices();
  await getFirebaseContactMessagesRef(firestore).doc(item.firebaseId).set(updates, { merge: true });
}

async function deleteContactMessageFromFirebase(item) {
  if (!item?.firebaseId) return;
  const { firestore } = await initFirebaseServices();
  await getFirebaseContactMessagesRef(firestore).doc(item.firebaseId).delete();
}

async function loadDashboardDataFromFirebase() {
  try {
    const { firestore } = await initFirebaseServices();
    const snapshot = await getFirebaseContentRef(firestore).get();
    if (!snapshot.exists) {
      return null;
    }
    const payload = snapshot.data() || {};
    return payload.content || null;
  } catch (error) {
    console.warn("Firebase content load failed; using local data.", error);
    return null;
  }
}



function dataUrlToBlob(dataUrl) {
  const [meta, base64] = String(dataUrl || "").split(",");
  const mime = meta.match(/data:([^;]+)/)?.[1] || "image/jpeg";
  const binary = window.atob(base64 || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], { type: mime });
}

function getImageExtension(dataUrl) {
  const mime = String(dataUrl || "").match(/data:image\/([^;]+)/)?.[1] || "jpg";
  return mime === "jpeg" ? "jpg" : mime.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

async function uploadInlineImageToCloudinary(dataUrl, pathHint = "image") {
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", dataUrl);
  formData.append("upload_preset", cloudinaryUploadPreset);
  formData.append("folder", "vien-portfolio");
  formData.append("public_id", String(pathHint || "image").replace(/[^a-z0-9-]/gi, "-").toLowerCase());

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error?.message || "Cloudinary upload failed.");
  }

  return payload.secure_url;
}

async function uploadInlineImagesForCloud(value, pathHint = "content") {
  if (Array.isArray(value)) {
    const items = [];
    for (let index = 0; index < value.length; index += 1) {
      items.push(await uploadInlineImagesForCloud(value[index], `${pathHint}-${index}`));
    }
    return items;
  }

  if (value && typeof value === "object") {
    const entries = [];
    for (const [key, itemValue] of Object.entries(value)) {
      entries.push([key, await uploadInlineImagesForCloud(itemValue, `${pathHint}-${key}`)]);
    }
    return Object.fromEntries(entries);
  }

  if (typeof value === "string" && value.startsWith("data:image/")) {
    return uploadInlineImageToCloudinary(value, pathHint);
  }

  return value;
}

function stripInlineImagesForFirebase(value) {
  if (Array.isArray(value)) {
    return value.map(stripInlineImagesForFirebase);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, itemValue]) => {
        if (typeof itemValue === "string" && itemValue.startsWith("data:image/")) {
          return [key, ""];
        }
        return [key, stripInlineImagesForFirebase(itemValue)];
      })
    );
  }

  return value;
}

function getFirebaseSaveErrorMessage(error) {
  const text = String(error?.message || error || "").toLowerCase();
  if (text.includes("cloudinary") || text.includes("upload preset") || text.includes("upload failed")) {
    return "Cloudinary chưa upload được ảnh. Kiểm tra Cloud name, unsigned upload preset và preset phải ở chế độ Unsigned.";
  }
  if (text.includes("permission") || text.includes("permission-denied")) {
    return "Firebase chưa cho phép ghi dữ liệu. Kiểm tra Firestore/Storage Rules và đăng nhập dashboard bằng email Firebase.";
  }
  if (text.includes("size") || text.includes("maximum") || text.includes("too large")) {
    return "Dữ liệu có ảnh quá nặng nên Firestore không nhận. Mình đã bỏ ảnh base64 khi sync, hãy lưu lại lần nữa.";
  }
  return "Dữ liệu đã lưu trên trình duyệt, nhưng chưa đồng bộ lên Firebase. Kiểm tra Auth/Firestore rules rồi thử lại.";
}

async function persistDashboardDataToFirebase(data) {
  try {
    const { firestore } = await initFirebaseServices();
    const content = await uploadInlineImagesForCloud(normalizeDashboardData(data), "site-content");
    await getFirebaseContentRef(firestore).set(
      {
        content: stripInlineImagesForFirebase(content),
        updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    try {
      window.localStorage.setItem(dashboardStorageKey, JSON.stringify(content));
    } catch (error) {}
    window.dispatchEvent(new CustomEvent("nino-dashboard-cloud-saved", { detail: data }));
    return true;
  } catch (error) {
    console.warn("Firebase content save failed.", error);
    window.dispatchEvent(
      new CustomEvent("nino-dashboard-save-error", {
        detail: {
          error,
          message: getFirebaseSaveErrorMessage(error),
        },
      })
    );
    if (document.querySelector("[data-dashboard-app]")) {
      window.alert(getFirebaseSaveErrorMessage(error));
    }
    return false;
  }
}

async function hydrateDashboardDataFromFirebase() {
  const remoteData = await loadDashboardDataFromFirebase();
  if (!remoteData) {
    return getDashboardData();
  }

  const data = normalizeDashboardData({ ...dashboardSeed, ...remoteData });
  try {
    window.localStorage.setItem(dashboardVersionStorageKey, dashboardContentVersion);
    window.localStorage.setItem(dashboardStorageKey, JSON.stringify(data));
  } catch (error) {}
  setSiteBranding(data.branding?.logo || "", data.branding?.favicon || "");
  window.dispatchEvent(new CustomEvent("nino-dashboard-updated", { detail: data }));
  return data;
}

function normalizeDashboardData(data) {
  return {
    ...data,
    hero: (data.hero || dashboardSeed.hero).map((item) => ({
      ...item,
      status: item.status || "Active",
      link: item.link || "/contact/",
      image: item.image || "assets/images/about/me.jpg",
      tags: item.tags || "Get In touch",
      detail: {
        reviewScore: item.detail?.reviewScore || "(4.96 of 5)",
        reviewDescription: item.detail?.reviewDescription || "Five-star reviews from my esteemed clients.",
        avatarOne: item.detail?.avatarOne || "assets/images/avatar/01.jpg",
        avatarTwo: item.detail?.avatarTwo || "assets/images/avatar/02.jpg",
        avatarThree: item.detail?.avatarThree || "assets/images/avatar/03.jpg",
      },
    })),
    testimonials: (data.testimonials || []).map((item) => ({
      ...item,
      link: item.link === "/about/#testimonials" ? "/#testimonials" : item.link,
      status:
        item.status === "Published" ? "Active" : item.status === "Review" ? "Disabled" : item.status,
    })),
    projects: (data.projects || []).map((item) => ({
      ...item,
      link: item.link && item.link !== "/single-project/" ? item.link : getProjectDetailLink(item),
      detail: getProjectDetailDefaults(item),
      status:
        item.status === "Published" ? "Active" : item.status === "Review" ? "Disabled" : item.status,
    })),
    skills: (data.skills || []).map((item) => ({
      ...item,
      owner: item.owner || "Skill",
      status:
        item.status === "Published" ? "Active" : item.status === "Review" ? "Disabled" : item.status || "Active",
      link: item.link || "/about/#skills",
    })),
    blog: (data.blog || []).map((item) => ({
      ...item,
      status:
        item.status === "Published" ? "Active" : item.status === "Review" ? "Disabled" : item.status,
    })),
    companies: (data.companies || []).map((item) => ({
      ...item,
      owner: item.owner || "Company",
      status:
        item.status === "Published" ? "Active" : item.status === "Review" ? "Disabled" : item.status || "Active",
      tags: item.tags || "Company",
      link: item.link || "#",
    })),
    social: (data.social || []).map((item) => ({
      ...item,
      owner: item.owner || "ri-global-line",
      status:
        item.status === "Published" ? "Active" : item.status === "Review" ? "Disabled" : item.status || "Active",
    })),
    contact: (data.contact || []).map((item) => ({
      ...item,
      status: item.status === "Active" || item.status === "Draft" ? "Unread" : item.status || "Unread",
      link: item.link || (item.email ? `mailto:${item.email}` : "/contact/"),
    })),
    logo: data.logo || [],
    branding: {
      logo: data.branding?.logo || data.logo?.[0]?.image || getSiteLogo(),
      favicon: data.branding?.favicon || data.logo?.[0]?.summary || getSiteFavicon(),
    },
  };
}

function getDashboardData() {
  try {
    const storedData = window.localStorage.getItem(dashboardStorageKey);
    const storedVersion = window.localStorage.getItem(dashboardVersionStorageKey);
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const data =
      parsedData && storedVersion === dashboardContentVersion
        ? { ...dashboardSeed, ...parsedData }
        : {
            ...dashboardSeed,
            hero: parsedData?.hero || dashboardSeed.hero,
            skills: dashboardSeed.skills,
            social: parsedData?.social || dashboardSeed.social,
            companies: parsedData?.companies || dashboardSeed.companies,
            contact: parsedData?.contact || [],
            logo: parsedData?.logo || [],
            branding: parsedData?.branding || dashboardSeed.branding,
          };

    if (storedVersion !== dashboardContentVersion) {
      window.localStorage.setItem(dashboardVersionStorageKey, dashboardContentVersion);
      window.localStorage.setItem(dashboardStorageKey, JSON.stringify(data));
    }

    return normalizeDashboardData(data);
  } catch (error) {
    return dashboardSeed;
  }
}

function setDashboardData(data) {
  try {
    window.localStorage.setItem(dashboardStorageKey, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("nino-dashboard-updated", { detail: data }));
    persistDashboardDataToFirebase(data);
    return true;
  } catch (error) {
    const isQuotaError =
      error?.name === "QuotaExceededError" ||
      error?.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      String(error?.message || "").toLowerCase().includes("quota");
    window.dispatchEvent(
      new CustomEvent("nino-dashboard-save-error", {
        detail: {
          error,
          message: isQuotaError
            ? "Ảnh vẫn quá nặng nên trình duyệt không lưu được. Hãy dùng ảnh nhỏ hơn hoặc dán URL ảnh."
            : "Không lưu được dữ liệu dashboard. Vui lòng thử lại.",
        },
      })
    );
    return false;
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function getSkillIconClass(item = {}) {
  const currentIcon = String(item.owner || "").trim();
  if (currentIcon) {
    return currentIcon;
  }

  const iconByTitle = {
    illustrator: "selfhst-adobe-illustrator",
    photoshop: "selfhst-adobe-photoshop",
    figma: "solar-figma-bold-duotone",
    capcut: "selfhst-capcut",
    "premiere pro": "selfhst-adobe-premiere-pro",
    premiere: "selfhst-adobe-premiere-pro",
    "premiear pro": "selfhst-adobe-premiere-pro",
  };

  return iconByTitle[String(item.title || "").trim().toLowerCase()] || "ri-tools-line";
}

function getDefaultItemLink(type) {
  return dashboardLabels[type]?.page || "/";
}

function getProjectDetailLink(project) {
  return `/single-project/?id=${encodeURIComponent(project.id)}`;
}

function getProjectDetailDefaults(item = {}) {
  return {
    region: item.detail?.region || "Vietnam",
    year: item.detail?.year || item.date?.slice(0, 4) || "2024",
    role: item.detail?.role || item.owner || "UI/UX Designer",
    service: item.detail?.service || item.tags || "Product Design",
    overview:
      item.detail?.overview ||
      item.summary ||
      "A focused case study covering the design context, research, solution direction, and final outcome.",
    problem:
      item.detail?.problem ||
      "Users need a clearer way to complete important tasks without confusion, delay, or scattered information.",
    goal:
      item.detail?.goal ||
      "Create a clearer, more useful experience with strong visual hierarchy and a practical user flow.",
    responsibilities:
      item.detail?.responsibilities ||
      "Research and interviews\nInformation architecture\nWireframing\nUI design\nPrototype and iteration",
    research:
      item.detail?.research ||
      "Research helped identify the most important user needs, blockers, and decisions that shaped the product direction.",
    painPoints:
      item.detail?.painPoints ||
      "Unclear priority\nSlow decision making\nLimited visibility",
    wireframes:
      item.detail?.wireframes ||
      "Early maps and wireframes explored the core structure before moving into high-fidelity design.",
    design:
      item.detail?.design ||
      "The final design system focused on clarity, rhythm, useful states, and a visual language that supports repeated use.",
    prototype:
      item.detail?.prototype ||
      "The prototype connected the primary flow, key screens, and feedback states so the experience could be tested end to end.",
    impact:
      item.detail?.impact ||
      "The final concept makes the experience easier to understand, faster to navigate, and more confidence-building for users.",
    learned:
      item.detail?.learned ||
      "Small interface decisions can change how confident users feel when they move through a complex workflow.",
    nextSteps:
      item.detail?.nextSteps ||
      "Validate with more users\nExpand edge cases\nRefine analytics and content states",
    researchImageOne: item.detail?.researchImageOne || item.image || "assets/images/projects/work1.jpg",
    researchImageTwo: item.detail?.researchImageTwo || "assets/images/projects/work3.jpg",
    wireframeImage: item.detail?.wireframeImage || "assets/images/projects/work4.jpg",
    mockupImageOne: item.detail?.mockupImageOne || item.image || "assets/images/projects/work5.jpg",
    mockupImageTwo: item.detail?.mockupImageTwo || "assets/images/blog/blog1.jpg",
    mockupImageThree: item.detail?.mockupImageThree || "assets/images/blog/blog2.jpg",
    mockupImageFour: item.detail?.mockupImageFour || "assets/images/blog/blog3.jpg",
    blocks: Array.isArray(item.detail?.blocks) ? item.detail.blocks : [],
  };
}

function getSiteLogo() {
  try {
    return window.localStorage.getItem(siteLogoStorageKey) || defaultSiteLogo;
  } catch (error) {
    return defaultSiteLogo;
  }
}

function getSiteFavicon() {
  try {
    return window.localStorage.getItem(siteFaviconStorageKey) || defaultSiteFavicon;
  } catch (error) {
    return defaultSiteFavicon;
  }
}

function setSiteBranding(logoSrc, faviconSrc) {
  const nextLogo = logoSrc || defaultSiteLogo;
  const nextFavicon = faviconSrc || defaultSiteFavicon;
  try {
    if (logoSrc) {
      window.localStorage.setItem(siteLogoStorageKey, logoSrc);
    } else {
      window.localStorage.removeItem(siteLogoStorageKey);
    }

    if (faviconSrc) {
      window.localStorage.setItem(siteFaviconStorageKey, faviconSrc);
    } else {
      window.localStorage.removeItem(siteFaviconStorageKey);
    }
  } catch (error) {}
  applySiteBranding(nextLogo, nextFavicon);
}

function applySiteBranding(logoSrc = getSiteLogo(), faviconSrc = getSiteFavicon()) {
  document
    .querySelectorAll('img[src*="assets/images/logo.png"], [data-site-logo]')
    .forEach((image) => {
      image.setAttribute("src", logoSrc);
      image.setAttribute("data-site-logo", "");
    });

  document
    .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], [data-site-favicon]')
    .forEach((icon) => {
      icon.setAttribute("href", faviconSrc);
      icon.setAttribute("data-site-favicon", "");
    });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readImageSize(dataUrl) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => resolve({ width: 0, height: 0 });
    image.src = dataUrl;
  });
}

function optimizeImageForStorage(file, options = {}) {
  const maxWidth = options.maxWidth || 1200;
  const maxHeight = options.maxHeight || 1000;
  const quality = options.quality || 0.78;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const originalDataUrl = String(reader.result || "");
      const image = new Image();
      image.onload = () => {
        const originalWidth = image.naturalWidth || maxWidth;
        const originalHeight = image.naturalHeight || maxHeight;
        const ratio = Math.min(1, maxWidth / originalWidth, maxHeight / originalHeight);
        const width = Math.max(1, Math.round(originalWidth * ratio));
        const height = Math.max(1, Math.round(originalHeight * ratio));

        if (ratio === 1 && file.size < 650000) {
          resolve({
            dataUrl: originalDataUrl,
            width: originalWidth,
            height: originalHeight,
            originalWidth,
            originalHeight,
            optimized: false,
          });
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({
          dataUrl,
          width,
          height,
          originalWidth,
          originalHeight,
          optimized: true,
        });
      };
      image.onerror = () => reject(new Error("Không đọc được ảnh đã chọn."));
      image.src = originalDataUrl;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function initDashboardAuth() {
  const app = document.querySelector("[data-dashboard-app]");

  if (!app) {
    return;
  }

  const loginNode = app.querySelector("[data-dashboard-login]");
  const logoutButton = app.querySelector("[data-dashboard-logout]");
  const menuToggleButton = app.querySelector("[data-dashboard-menu-toggle]");

  function setAuthenticated(isAuthenticated) {
    if (isAuthenticated) {
      window.sessionStorage.setItem(dashboardAuthKey, "true");
      app.classList.add("is-authenticated");
    } else {
      window.sessionStorage.removeItem(dashboardAuthKey);
      app.classList.remove("is-authenticated");
    }
  }

  setAuthenticated(window.sessionStorage.getItem(dashboardAuthKey) === "true");

  const passwordToggle = app.querySelector("[data-dashboard-password-toggle]");
  const passwordInput = app.querySelector("[data-dashboard-password-input]");

  passwordToggle?.addEventListener("click", () => {
    if (!passwordInput) {
      return;
    }
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    passwordToggle.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
    passwordToggle.innerHTML = isHidden ? '<i class="ri-eye-off-line"></i>' : '<i class="ri-eye-line"></i>';
  });

  loginNode?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginNode);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const errorNode = loginNode.querySelector("[data-dashboard-login-error]");

    try {
      const { auth } = await initFirebaseServices();
      await auth.signInWithEmailAndPassword(username, password);
      if (errorNode) {
        errorNode.textContent = "";
      }
      loginNode.reset();
      setAuthenticated(true);
      window.dispatchEvent(new CustomEvent("nino-dashboard-authenticated"));
    } catch (error) {
      if (errorNode) {
        errorNode.textContent = "Sai email hoặc mật khẩu Firebase admin.";
      }
    }
  });

  menuToggleButton?.addEventListener("click", () => {
    app.classList.toggle("is-menu-open");
  });

  app.addEventListener("click", (event) => {
    if (event.target.closest("[data-dashboard-type], .dashboard-back")) {
      app.classList.remove("is-menu-open");
    }
  });

  logoutButton?.addEventListener("click", async () => {
    try {
      const services = firebaseServices || (window.firebase ? await initFirebaseServices() : null);
      await services?.auth?.signOut();
    } catch (error) {}
    setAuthenticated(false);
  });
}

function initDashboard() {
  const app = document.querySelector("[data-dashboard-app]");

  if (!app) {
    return;
  }

  let data = getDashboardData();
  let activeType = "projects";
  let activeStatus = "All";
  let query = "";
  let editingItem = null;
  let editingImage = "";
  let editingImageMessage = "";
  let editingHeroSection = "";

  async function refreshContactMessages() {
    const messages = await loadContactMessagesFromFirebase();
    if (!messages) return;
    data = {
      ...getDashboardData(),
      contact: messages,
    };
    try {
      window.localStorage.setItem(dashboardStorageKey, JSON.stringify(data));
    } catch (error) {}
    render();
  }

  const listNode = app.querySelector("[data-dashboard-list]");
  const navNode = app.querySelector("[data-dashboard-nav]");
  const statNode = app.querySelector("[data-dashboard-stats]");
  const statusNode = app.querySelector("[data-dashboard-statuses]");
  const headingNode = app.querySelector("[data-dashboard-heading]");
  const helperNode = app.querySelector("[data-dashboard-helper]");
  const searchNode = app.querySelector("[data-dashboard-search]");
  const addButton = app.querySelector("[data-dashboard-add]");
  const pageLink = app.querySelector("[data-dashboard-page-link]");
  const modalNode = app.querySelector("[data-dashboard-modal]");

  function getAllItems() {
    return Object.values(data).flat();
  }

  function renderNav() {
    navNode.innerHTML = Object.keys(dashboardLabels)
      .map((type) => {
        const item = dashboardLabels[type];
        const activeClass = type === activeType ? "is-active" : "";

        const unreadCount =
          type === "contact"
            ? (data.contact || []).filter((message) => message.status === "Unread").length
            : 0;

        return `
          <button class="dashboard-nav__item ${activeClass}" type="button" data-dashboard-type="${type}">
            <i class="${dashboardIcons[type]}"></i>
            <span>${item.label}</span>
            ${unreadCount ? `<strong>${unreadCount}</strong>` : ""}
          </button>
        `;
      })
      .join("");
  }

  function renderStats() {
    if (!statNode) {
      return;
    }

    const allItems = getAllItems().filter((item) => item && item.title);
    const published = allItems.filter((item) => item.status === "Active").length;
    const drafts = allItems.filter((item) => item.status === "Draft").length;
    const unread = (data.contact || []).filter((item) => item.status === "Unread").length;

    statNode.innerHTML = `
      <article><span>Total items</span><strong>${allItems.length}</strong></article>
      <article><span>Active</span><strong>${published}</strong></article>
      <article><span>Drafts</span><strong>${drafts}</strong></article>
      <article><span>Unread messages</span><strong>${unread}</strong></article>
      <article><span>${dashboardLabels[activeType].label}</span><strong>${(data[activeType] || []).length}</strong></article>
    `;
  }

  function renderStatuses() {
    if (activeType === "logo") {
      statusNode.innerHTML = "";
      return;
    }

    const statuses = activeType === "contact" ? contactStatuses : dashboardStatuses;

    statusNode.innerHTML = statuses
      .map(
        (status) => `
          <button class="${status.value === activeStatus ? "is-active" : ""}" type="button" data-dashboard-status="${status.value}">
            ${activeType === "projects" || activeType === "contact" ? status.label : status.label.replace("Projects", dashboardLabels[activeType].label)}
          </button>
        `
      )
      .join("");
  }

  function getFilteredItems() {
    if (activeType === "logo") {
      return [];
    }

    const normalizedQuery = query.trim().toLowerCase();

    return data[activeType].filter((item) => {
      const searchable = `${item.title} ${item.owner} ${item.email || ""} ${item.summary} ${item.tags}`.toLowerCase();
      const matchesQuery = normalizedQuery ? searchable.includes(normalizedQuery) : true;
      const matchesStatus = activeStatus === "All" || item.status === activeStatus;

      return matchesQuery && matchesStatus;
    });
  }

  function renderList() {
    if (activeType === "hero") {
      const heroItem = (data.hero || dashboardSeed.hero)[0] || dashboardSeed.hero[0];
      const cleanReviewText = (text, score) =>
        String(text || "100+ reviews")
          .split(String(score || "")).join("")
          .replace(/\s+/g, " ")
          .trim();
      const reviewScore = heroItem.detail?.reviewScore || "(4.96 of 5)";
      const reviewText = cleanReviewText(heroItem.summary, reviewScore);
      const reviewAvatars = [
        heroItem.detail?.avatarOne || "assets/images/avatar/01.jpg",
        heroItem.detail?.avatarTwo || "assets/images/avatar/02.jpg",
        heroItem.detail?.avatarThree || "assets/images/avatar/03.jpg",
      ].filter(Boolean);

      listNode.className = "dashboard-card-grid dashboard-card-grid--hero dashboard-card-grid--avata-blocks";
      listNode.innerHTML = `
        <article class="dashboard-content-card dashboard-hero-card">
          <a class="dashboard-content-card__media" href="${escapeHtml(dashboardLabels.hero.page)}">
            <img src="${escapeHtml(heroItem.image || "assets/images/about/me.jpg")}" alt="${escapeHtml(heroItem.title)}" />
          </a>
          <div class="dashboard-content-card__body">
            <span class="dashboard-content-card__role">Nội dung chính chủ</span>
            <h3>${escapeHtml(heroItem.title)}</h3>
            <p>${escapeHtml(heroItem.owner)}</p>
          </div>
          <div class="dashboard-content-card__actions">
            <a href="/#home">Open <i class="ri-arrow-right-line"></i></a>
            <button type="button" aria-label="Edit Avata content" data-dashboard-edit="${heroItem.id}" data-dashboard-hero-section="content">
              <i class="ri-edit-line"></i>
            </button>
          </div>
        </article>
        <article class="dashboard-content-card dashboard-hero-card dashboard-hero-review-card">
          <div class="dashboard-hero-review-card__avatars">
            ${reviewAvatars
              .map((avatar, index) => `<img src="${escapeHtml(avatar)}" alt="Review avatar ${index + 1}" />`)
              .join("")}
          </div>
          <div class="dashboard-content-card__body">
            <span class="dashboard-content-card__role">Review khách hàng</span>
            <h3>${escapeHtml(reviewText)}</h3>
            <p>${escapeHtml(reviewScore)}</p>
            <p>${escapeHtml(heroItem.detail?.reviewDescription || "Five-star reviews from my esteemed clients.")}</p>
          </div>
          <div class="dashboard-content-card__actions">
            <button type="button" aria-label="Edit customer review" data-dashboard-edit="${heroItem.id}" data-dashboard-hero-section="review">
              <i class="ri-edit-line"></i>
            </button>
          </div>
        </article>
      `;
      return;
    }

    if (activeType === "projects" && editingItem) {
      renderProjectEditor();
      return;
    }

    if (activeType === "logo") {
      const currentLogo = getSiteLogo();
      const currentFavicon = getSiteFavicon();
      listNode.className = "dashboard-card-grid dashboard-card-grid--logo";
      listNode.innerHTML = `
        <article class="dashboard-logo-card">
          <div class="dashboard-logo-card__preview dashboard-logo-card__preview--logo">
            <img src="${escapeHtml(currentLogo)}" alt="Current site logo" data-site-logo-preview />
          </div>
          <div class="dashboard-logo-card__preview dashboard-logo-card__preview--favicon">
            <img src="${escapeHtml(currentFavicon)}" alt="Current favicon" data-site-favicon-preview />
            <span>Favicon preview</span>
          </div>
          <form data-dashboard-logo-form>
            <label>
              Upload logo
              <input type="file" accept="image/*" data-dashboard-logo-upload />
            </label>
            <label>
              Logo URL
              <input name="logo" value="${escapeHtml(currentLogo)}" placeholder="Paste logo image URL" data-dashboard-logo-url />
            </label>
            <label>
              Upload favicon
              <input type="file" accept="image/*,.ico" data-dashboard-favicon-upload />
            </label>
            <label>
              Favicon URL
              <input name="favicon" value="${escapeHtml(currentFavicon)}" placeholder="Paste favicon image URL" data-dashboard-favicon-url />
            </label>
            <div class="dashboard-logo-card__actions">
              <button class="dashboard-button dashboard-button--primary" type="submit">
                <i class="ri-save-line"></i>
                Save Branding
              </button>
              <button class="dashboard-button dashboard-button--secondary" type="button" data-dashboard-logo-reset>
                Reset default
              </button>
            </div>
            <small data-dashboard-logo-message></small>
          </form>
        </article>
      `;
      return;
    }

    const items = getFilteredItems();

    if (!items.length) {
      listNode.innerHTML = `
        <div class="dashboard-empty">
          <strong>No content found</strong>
          <span>Try another search term or status filter.</span>
        </div>
      `;
      return;
    }

    listNode.className =
      activeType === "blog"
        ? "dashboard-card-grid dashboard-card-grid--blog"
        : activeType === "social" || activeType === "skills" || activeType === "companies"
          ? "dashboard-card-grid dashboard-card-grid--compact-list"
          : "dashboard-card-grid";

    listNode.innerHTML = items
      .map((item) => {
        const tags = String(item.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        const cardImage =
          activeType === "projects"
            ? item.image || "assets/images/projects/work1.jpg"
            : activeType === "blog"
              ? item.image || "assets/images/blog/blog1.jpg"
              : activeType === "skills"
                ? item.image || "assets/images/skills/skill1.png"
                : activeType === "companies"
                  ? item.image || "assets/images/client-logos/partner1.png"
                  : item.image || "assets/images/testimonials/author1.jpg";

        if (activeType === "contact") {
          return `
            <article class="dashboard-contact-card">
              <div class="dashboard-contact-card__top">
                <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
                <time>${escapeHtml(item.date || "")}</time>
              </div>
              <h3>${escapeHtml(item.title || "New contact message")}</h3>
              <p class="dashboard-contact-card__sender">
                ${escapeHtml(item.owner || "Visitor")}
                ${item.email ? `<a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a>` : ""}
              </p>
              <p class="dashboard-contact-card__message">${escapeHtml(item.summary || "No message content.")}</p>
              <div class="dashboard-content-card__actions">
                <a href="${escapeHtml(item.link || (item.email ? `mailto:${item.email}` : "/contact/"))}">Reply <i class="ri-arrow-right-line"></i></a>
                <button type="button" aria-label="Mark message as read" data-dashboard-read="${item.id}">
                  <i class="ri-mail-check-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </article>
          `;
        }

        if (activeType === "social") {
          const iconClass = item.owner || "ri-global-line";

          return `
            <article class="dashboard-social-card">
              <div class="dashboard-social-card__icon">
                <i class="${escapeHtml(iconClass)}"></i>
              </div>
              <div>
                <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <a href="${escapeHtml(item.link || "#")}">${escapeHtml(item.link || "#")}</a>
                <p>${escapeHtml(item.summary || iconClass)}</p>
              </div>
              <div class="dashboard-content-card__actions">
                <a href="${escapeHtml(item.link || "#")}">Open <i class="ri-arrow-right-line"></i></a>
                <button type="button" aria-label="Edit ${escapeHtml(item.title)}" data-dashboard-edit="${item.id}">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </article>
          `;
        }

        if (activeType === "companies") {
          return `
            <article class="dashboard-social-card dashboard-company-card">
              <div class="dashboard-social-card__icon dashboard-company-card__logo">
                <img src="${escapeHtml(cardImage)}" alt="${escapeHtml(item.title)}" />
              </div>
              <div>
                <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                ${item.owner && item.owner !== "Company" ? `<p>${escapeHtml(item.owner)}</p>` : ""}
                <p>${escapeHtml(item.date || "Work period")}</p>
              </div>
              <div class="dashboard-content-card__actions">
                <button type="button" aria-label="Edit ${escapeHtml(item.title)}" data-dashboard-edit="${item.id}">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </article>
          `;
        }

        if (activeType === "skills") {
          return `
            <article class="dashboard-social-card dashboard-skill-card">
              <div class="dashboard-social-card__icon dashboard-skill-card__icon">
                <img src="${escapeHtml(cardImage)}" alt="${escapeHtml(item.title)}" />
              </div>
              <div>
                <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <a href="${escapeHtml(item.link || "/about/#skills")}">${escapeHtml(item.owner || "Skill")}</a>
                <p>Order ${escapeHtml(item.metric || "99")} · ${escapeHtml(item.summary || "Professional skill")}</p>
              </div>
              <div class="dashboard-content-card__actions">
                <a href="${escapeHtml(item.link || "/about/#skills")}">Open <i class="ri-arrow-right-line"></i></a>
                <button type="button" aria-label="Edit ${escapeHtml(item.title)}" data-dashboard-edit="${item.id}">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </article>
          `;
        }

        if (activeType === "blog") {
          return `
            <article class="dashboard-blog-card">
              <div class="postbox__item format-image transition-3">
                <div class="postbox__thumb w-img">
                  <a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">
                    <img src="${escapeHtml(cardImage)}" alt="${escapeHtml(item.title)}" />
                  </a>
                </div>
                <div class="postbox__content">
                  <div class="postbox__meta">
                    <span><a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}"><i class="fa-light fa-user"></i>${escapeHtml(item.owner || "Vien Nguyen")}</a></span>
                    <span><a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}"><i class="fa-light fa-clock"></i>${escapeHtml(item.date || "")}</a></span>
                    <span><a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}"><i class="fa-sharp fa-thin fa-comments"></i>${escapeHtml(item.metric || "Blog")}</a></span>
                  </div>
                  <h3 class="postbox__title">
                    <a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">${escapeHtml(item.title)}</a>
                  </h3>
                  <div class="postbox__text">
                    <p>${escapeHtml(item.summary || "Description")}</p>
                  </div>
                  <div class="postbox__read-more dashboard-blog-card__read-row">
                    <a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}" class="theme-btn">Read more</a>
                    <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
                  </div>
                </div>
              </div>
              <div class="dashboard-content-card__actions dashboard-preview-actions">
                <div class="dashboard-preview-actions__left">
                  <a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">Open <i class="ri-arrow-right-line"></i></a>
                </div>
                <button type="button" aria-label="Edit ${escapeHtml(item.title)}" data-dashboard-edit="${item.id}">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </article>
          `;
        }

        if (activeType === "testimonials") {
          return `
            <article class="dashboard-testimonial-card">
              <a class="testimonial-link" href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">
                <div class="testimonial-item">
                  <div class="author">
                    <img src="${escapeHtml(cardImage)}" alt="${escapeHtml(item.owner)}" />
                  </div>
                  <div class="text">${escapeHtml(item.summary || "Description")}</div>
                  <div class="testi-des">
                    <h5>${escapeHtml(item.owner)}</h5>
                    <span>${escapeHtml(item.title)}</span>
                  </div>
                </div>
              </a>
              <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
              <div class="dashboard-content-card__actions">
                <a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">Open <i class="ri-arrow-right-line"></i></a>
                <button type="button" aria-label="Edit ${escapeHtml(item.title)}" data-dashboard-edit="${item.id}">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </article>
          `;
        }

        return `
          <article class="dashboard-content-card">
            <a class="dashboard-content-card__media" href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">
              <img src="${escapeHtml(cardImage)}" alt="${escapeHtml(item.title)}" />
              <span class="dashboard-status dashboard-status--${String(item.status).toLowerCase()}">${escapeHtml(item.status)}</span>
            </a>
            <div class="dashboard-content-card__body">
              <div>
                <h3>${escapeHtml(item.title)}</h3>
                <p class="dashboard-content-card__role">${escapeHtml(item.owner || "UI/UX Designer")}</p>
                <p>${escapeHtml(item.summary || "Description")}</p>
              </div>
              <div class="dashboard-content-card__tags">
                ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
              </div>
              <div class="dashboard-content-card__actions">
                <a href="${escapeHtml(item.link || getDefaultItemLink(activeType))}">Open <i class="ri-arrow-right-line"></i></a>
                <button type="button" aria-label="Edit ${escapeHtml(item.title)}" data-dashboard-edit="${item.id}">
                  <i class="ri-edit-line"></i>
                </button>
                <button type="button" aria-label="Delete ${escapeHtml(item.title)}" data-dashboard-delete="${item.id}">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderHeader() {
    const unreadMessages = (data.contact || []).filter((item) => item.status === "Unread").length;
    headingNode.textContent = dashboardLabels[activeType].label;
    helperNode.textContent = unreadMessages
      ? `${dashboardLabels[activeType].helper} You have ${unreadMessages} unread contact message${unreadMessages > 1 ? "s" : ""}.`
      : dashboardLabels[activeType].helper;
    addButton.querySelector("span").textContent = `Add ${dashboardLabels[activeType].singular}`;
    addButton.hidden = activeType === "contact" || activeType === "logo";
    searchNode.placeholder =
      activeType === "contact" ? "Search messages" : activeType === "social" ? "Search social links" : "Search";
    searchNode.disabled = activeType === "logo";
    pageLink.hidden = false;
    pageLink.href = dashboardLabels[activeType].page;
    pageLink.querySelector("span").textContent = `Open ${dashboardLabels[activeType].label} page`;
  }

  function renderProjectImageField(label, name, value) {
    const preview = value
      ? '<img src="' + escapeHtml(value) + '" alt="' + escapeHtml(label) + '" />'
      : "<small>No image selected</small>";

    return `
      <label class="dashboard-detail-image-field">
        <span>${label}</span>
        <input type="file" accept="image/*" data-dashboard-detail-image-upload="${name}" />
        <input name="${name}" value="${escapeHtml(value)}" placeholder="Paste image URL" data-dashboard-detail-image-url="${name}" />
        <div class="dashboard-detail-image-preview" data-dashboard-detail-image-preview="${name}">
          ${preview}
        </div>
      </label>
    `;
  }


  function renderProjectFlexibleBlock(block = {}, key = Date.now()) {
    const type = block.type === "image" ? "image" : "text";
    const imagePreview = block.image
      ? '<img src="' + escapeHtml(block.image) + '" alt="' + escapeHtml(block.title || "Project image") + '" />'
      : "<small>No image selected</small>";

    return `
      <article class="dashboard-flex-block" data-dashboard-flex-block="${key}">
        <header>
          <strong>Content block</strong>
          <button type="button" data-dashboard-remove-detail-block aria-label="Remove block">
            <i class="ri-close-line"></i>
          </button>
        </header>
        <div class="dashboard-detail-editor__grid">
          <label>Block type
            <select name="detailBlockType">
              <option value="text" ${type === "text" ? "selected" : ""}>Text</option>
              <option value="image" ${type === "image" ? "selected" : ""}>Image</option>
            </select>
          </label>
          <label>Title<input name="detailBlockTitle" value="${escapeHtml(block.title || "")}" placeholder="Section title" /></label>
        </div>
        <label>Text<textarea name="detailBlockText" rows="4" placeholder="Write project detail text here">${escapeHtml(block.text || "")}</textarea></label>
        <label class="dashboard-detail-image-field">
          <span>Image</span>
          <input type="file" accept="image/*" data-dashboard-flex-image-upload="${key}" />
          <input name="detailBlockImage" value="${escapeHtml(block.image || "")}" placeholder="Paste image URL" data-dashboard-flex-image-url="${key}" />
          <div class="dashboard-detail-image-preview" data-dashboard-flex-image-preview="${key}">
            ${imagePreview}
          </div>
        </label>
      </article>
    `;
  }

  function renderProjectDetailFields() {
    const detail = getProjectDetailDefaults(editingItem);

    return `
      <div class="dashboard-form__wide dashboard-detail-editor">
        <h3>Project detail</h3>
        <div class="dashboard-detail-editor__grid">
          <label>Region<input name="detailRegion" value="${escapeHtml(detail.region)}" /></label>
          <label>Year<input name="detailYear" value="${escapeHtml(detail.year)}" /></label>
          <label>Role<input name="detailRole" value="${escapeHtml(detail.role)}" /></label>
          <label>Service<input name="detailService" value="${escapeHtml(detail.service)}" /></label>
        </div>
        <label>Overview<textarea name="detailOverview" rows="4">${escapeHtml(detail.overview)}</textarea></label>
        <div class="dashboard-detail-editor__grid">
          <label>Problem<textarea name="detailProblem" rows="4">${escapeHtml(detail.problem)}</textarea></label>
          <label>Goal<textarea name="detailGoal" rows="4">${escapeHtml(detail.goal)}</textarea></label>
        </div>
        <label>Responsibilities <small>One item per line</small><textarea name="detailResponsibilities" rows="5">${escapeHtml(detail.responsibilities)}</textarea></label>
        <label>User research<textarea name="detailResearch" rows="4">${escapeHtml(detail.research)}</textarea></label>
        <label>Pain points <small>One item per line</small><textarea name="detailPainPoints" rows="4">${escapeHtml(detail.painPoints)}</textarea></label>
        <div class="dashboard-detail-editor__grid">
          ${renderProjectImageField("Research image 1", "detailResearchImageOne", detail.researchImageOne)}
          ${renderProjectImageField("Research image 2", "detailResearchImageTwo", detail.researchImageTwo)}
        </div>
        <label>Wireframes<textarea name="detailWireframes" rows="4">${escapeHtml(detail.wireframes)}</textarea></label>
        ${renderProjectImageField("Wireframe image", "detailWireframeImage", detail.wireframeImage)}
        <label>Design<textarea name="detailDesign" rows="4">${escapeHtml(detail.design)}</textarea></label>
        <div class="dashboard-detail-editor__grid dashboard-detail-editor__grid--mockups">
          ${renderProjectImageField("Mockup image 1", "detailMockupImageOne", detail.mockupImageOne)}
          ${renderProjectImageField("Mockup image 2", "detailMockupImageTwo", detail.mockupImageTwo)}
          ${renderProjectImageField("Mockup image 3", "detailMockupImageThree", detail.mockupImageThree)}
          ${renderProjectImageField("Mockup image 4", "detailMockupImageFour", detail.mockupImageFour)}
        </div>
        <div class="dashboard-flex-blocks">
          <div class="dashboard-flex-blocks__head">
            <div>
              <h4>Flexible content blocks</h4>
              <small>Add as many text or image blocks as this project needs.</small>
            </div>
            <div>
              <button type="button" data-dashboard-add-detail-block="text">Add text</button>
              <button type="button" data-dashboard-add-detail-block="image">Add image</button>
            </div>
          </div>
          <div data-dashboard-flex-blocks>
            ${detail.blocks.map((block, index) => renderProjectFlexibleBlock(block, `saved-${index}`)).join("")}
          </div>
        </div>
        <label>Prototype<textarea name="detailPrototype" rows="4">${escapeHtml(detail.prototype)}</textarea></label>
        <div class="dashboard-detail-editor__grid">
          <label>Impact<textarea name="detailImpact" rows="4">${escapeHtml(detail.impact)}</textarea></label>
          <label>What I learned<textarea name="detailLearned" rows="4">${escapeHtml(detail.learned)}</textarea></label>
        </div>
        <label>Next steps <small>One item per line</small><textarea name="detailNextSteps" rows="4">${escapeHtml(detail.nextSteps)}</textarea></label>
      </div>
    `;
  }

  function renderProjectEditor() {
    const detail = getProjectDetailDefaults(editingItem);
    const tools = String(editingItem.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    listNode.className = "dashboard-project-editor";
    listNode.innerHTML = `
      <form class="dashboard-project-editor__form" data-dashboard-form>
        <aside class="dashboard-project-editor__side">
          <section class="dashboard-project-editor__card">
            <label class="dashboard-project-editor__label">
              Thumbnail <em>*</em>
            </label>
            <div class="dashboard-project-thumb" data-dashboard-image-preview>
              ${editingImage ? `<img src="${escapeHtml(editingImage)}" alt="${escapeHtml(editingItem.title || "Project thumbnail")}" />` : `
                <div class="dashboard-project-thumb__empty">
                  <i class="ri-image-line"></i>
                </div>
              `}
            </div>
            <label class="dashboard-project-thumb__edit" aria-label="Upload thumbnail">
              <i class="ri-pencil-line"></i>
              <input name="imageUpload" type="file" accept="image/*" data-dashboard-image-upload />
            </label>
            <p>Set the project thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted.</p>
            <input name="image" value="${escapeHtml(editingImage)}" placeholder="Or paste image URL" data-dashboard-image-url />
            <small data-dashboard-image-message>${escapeHtml(editingImageMessage)}</small>
          </section>

          <section class="dashboard-project-editor__card">
            <label class="dashboard-project-editor__label">
              Status <em>*</em>
            </label>
            <select name="status">
              <option ${editingItem.status === "Active" ? "selected" : ""}>Active</option>
              <option ${editingItem.status === "Draft" ? "selected" : ""}>Draft</option>
              <option ${editingItem.status === "Disabled" ? "selected" : ""}>Disabled</option>
            </select>
          </section>
        </aside>

        <section class="dashboard-project-editor__panel">
          <header>
            <h2>${editingItem.id ? "Edit Project" : "Add Project"}</h2>
            <button type="button" data-dashboard-close aria-label="Close editor">
              <i class="ri-close-line"></i>
            </button>
          </header>
          <div class="dashboard-project-editor__fields">
            <input type="hidden" name="owner" value="${escapeHtml(editingItem.owner || "Vien Nguyen")}" />
            <input type="hidden" name="date" value="${escapeHtml(editingItem.date || new Date().toISOString().slice(0, 10))}" />
            <input type="hidden" name="metric" value="${escapeHtml(editingItem.metric || "1200x1000")}" />

            <label>Project Name<input name="title" value="${escapeHtml(editingItem.title)}" placeholder="Enter your title here" required /></label>
            <label>Role<input name="detailRole" value="${escapeHtml(detail.role || "")}" placeholder="Enter your role here" /></label>
            <label>Category / Type<input name="detailService" value="${escapeHtml(detail.service || "")}" placeholder="Value" /></label>
            <label>Tools Used
              <div class="dashboard-project-tools" data-dashboard-tools>
                ${tools.map((tool) => `<span>${escapeHtml(tool)} <button type="button" data-dashboard-tool-remove="${escapeHtml(tool)}">×</button></span>`).join("")}
                <input name="tags" value="${escapeHtml(editingItem.tags)}" placeholder="Figma, Photoshop, Illustrator" />
              </div>
            </label>
            <label>Description<textarea name="summary" rows="5" maxlength="180" placeholder="Enter your title here" data-dashboard-summary-input>${escapeHtml(editingItem.summary)}</textarea><small data-dashboard-summary-count>${String(editingItem.summary || "").length}/180</small></label>
            <label>Demo Project<input name="link" value="${escapeHtml(editingItem.link || getDefaultItemLink(activeType))}" placeholder="Enter your title here" /></label>

            <details class="dashboard-project-detail">
              <summary>Project detail information</summary>
              ${renderProjectDetailFields()}
            </details>
          </div>
          <footer>
            <button class="dashboard-button dashboard-button--primary" type="submit">Save</button>
          </footer>
        </section>
      </form>
    `;
  }

  function renderModal() {
    if (activeType === "projects" || !editingItem) {
      modalNode.classList.remove("is-open");
      modalNode.innerHTML = "";
      return;
    }

    const mediaLabels = {
      hero: {
        label: "Avata main image",
        note: "Upload the large image shown in the center of the home section.",
      },
      projects: {
        label: "Project cover image",
        note: "Recommended size: 1200x1000px. Images are stored in this browser via localStorage.",
      },
      blog: {
        label: "Blog cover image",
        note: "Recommended size: 1200x1000px for consistent blog thumbnails.",
      },
      testimonials: {
        label: "Author avatar",
        note: "Recommended square image for testimonial authors.",
      },
      skills: {
        label: "Skill image",
        note: "Upload a square icon/image for this skill or paste an image URL.",
      },
      companies: {
        label: "Company logo",
        note: "Upload a transparent logo or paste an image URL.",
      },
    };
    const mediaConfig = mediaLabels[activeType];
    const mediaFields =
      mediaConfig
        ? `
          <label class="dashboard-form__wide dashboard-image-field">
            ${mediaConfig.label}
            <input name="imageUpload" type="file" accept="image/*" data-dashboard-image-upload />
            <span class="dashboard-field-note">${mediaConfig.note}</span>
            <input name="image" value="${escapeHtml(editingImage)}" placeholder="Or paste image URL" data-dashboard-image-url />
            <div class="dashboard-image-preview" data-dashboard-image-preview>
              ${editingImage ? `<img src="${escapeHtml(editingImage)}" alt="${escapeHtml(editingItem.title || "Content image")}" />` : "<span>No image selected</span>"}
            </div>
            <small data-dashboard-image-message>${escapeHtml(editingImageMessage)}</small>
          </label>
        `
        : "";

    modalNode.classList.add("is-open");

    if (activeType === "hero") {
      modalNode.innerHTML = `
        <div class="dashboard-modal__panel">
          <header>
            <div>
              <p>Avata editor</p>
              <h2>Edit Avata</h2>
            </div>
            <button type="button" data-dashboard-close aria-label="Close editor">
              <i class="ri-close-line"></i>
            </button>
          </header>
          <form data-dashboard-form>
            ${editingHeroSection === "review"
              ? `
                <div class="dashboard-form-section dashboard-form__wide">
                  <h3>Review khách hàng</h3>
                  <p>Only customer review content and review avatars.</p>
                </div>
                <label>Review text<input name="summary" value="${escapeHtml(String(editingItem.summary || "100+ reviews").split(String(editingItem.detail?.reviewScore || "")).join("").replace(/\s+/g, " ").trim())}" /></label>
                <label>Review score<input name="heroReviewScore" value="${escapeHtml(editingItem.detail?.reviewScore || "(4.96 of 5)")}" /></label>
                <label class="dashboard-form__wide">Review description<input name="heroReviewDescription" value="${escapeHtml(editingItem.detail?.reviewDescription || "Five-star reviews from my esteemed clients.")}" /></label>
                <div class="dashboard-review-avatar-field">
                  <span>Avatar 1</span>
                  <input type="file" accept="image/*" data-dashboard-hero-avatar-upload="heroAvatarOne" />
                  <input name="heroAvatarOne" value="${escapeHtml(editingItem.detail?.avatarOne || "assets/images/avatar/01.jpg")}" placeholder="Or paste avatar image URL" data-dashboard-hero-avatar-url="heroAvatarOne" />
                  <div class="dashboard-review-avatar-preview" data-dashboard-hero-avatar-preview="heroAvatarOne">
                    <img src="${escapeHtml(editingItem.detail?.avatarOne || "assets/images/avatar/01.jpg")}" alt="Review avatar 1" />
                  </div>
                </div>
                <div class="dashboard-review-avatar-field">
                  <span>Avatar 2</span>
                  <input type="file" accept="image/*" data-dashboard-hero-avatar-upload="heroAvatarTwo" />
                  <input name="heroAvatarTwo" value="${escapeHtml(editingItem.detail?.avatarTwo || "assets/images/avatar/02.jpg")}" placeholder="Or paste avatar image URL" data-dashboard-hero-avatar-url="heroAvatarTwo" />
                  <div class="dashboard-review-avatar-preview" data-dashboard-hero-avatar-preview="heroAvatarTwo">
                    <img src="${escapeHtml(editingItem.detail?.avatarTwo || "assets/images/avatar/02.jpg")}" alt="Review avatar 2" />
                  </div>
                </div>
                <div class="dashboard-review-avatar-field">
                  <span>Avatar 3</span>
                  <input type="file" accept="image/*" data-dashboard-hero-avatar-upload="heroAvatarThree" />
                  <input name="heroAvatarThree" value="${escapeHtml(editingItem.detail?.avatarThree || "assets/images/avatar/03.jpg")}" placeholder="Or paste avatar image URL" data-dashboard-hero-avatar-url="heroAvatarThree" />
                  <div class="dashboard-review-avatar-preview" data-dashboard-hero-avatar-preview="heroAvatarThree">
                    <img src="${escapeHtml(editingItem.detail?.avatarThree || "assets/images/avatar/03.jpg")}" alt="Review avatar 3" />
                  </div>
                </div>
                <input type="hidden" name="title" value="${escapeHtml(editingItem.title || "Vien Nguyen")}" />
                <input type="hidden" name="owner" value="${escapeHtml(editingItem.owner || "")}" />
                <input type="hidden" name="tags" value="${escapeHtml(editingItem.tags || "Get In touch")}" />
                <input type="hidden" name="link" value="${escapeHtml(editingItem.link || "/contact/")}" />
              `
              : `
                <div class="dashboard-form-section dashboard-form__wide">
                  <h3>Nội dung chính chủ</h3>
                  <p>Only the owner intro content, CTA, and main avata image.</p>
                </div>
                <label>Avata title<input name="title" value="${escapeHtml(editingItem.title)}" required /></label>
                <label>Button text<input name="tags" value="${escapeHtml(editingItem.tags || "Get In touch")}" /></label>
                <label class="dashboard-form__wide">Intro text<textarea name="owner" rows="4">${escapeHtml(editingItem.owner)}</textarea></label>
                <label class="dashboard-form__wide">Button link<input name="link" value="${escapeHtml(editingItem.link || "/contact/")}" /></label>
                ${mediaFields}
                <input type="hidden" name="summary" value="${escapeHtml(editingItem.summary || "100+ reviews")}" />
                <input type="hidden" name="heroReviewScore" value="${escapeHtml(editingItem.detail?.reviewScore || "(4.96 of 5)")}" />
                <input type="hidden" name="heroReviewDescription" value="${escapeHtml(editingItem.detail?.reviewDescription || "Five-star reviews from my esteemed clients.")}" />
                <input type="hidden" name="heroAvatarOne" value="${escapeHtml(editingItem.detail?.avatarOne || "assets/images/avatar/01.jpg")}" />
                <input type="hidden" name="heroAvatarTwo" value="${escapeHtml(editingItem.detail?.avatarTwo || "assets/images/avatar/02.jpg")}" />
                <input type="hidden" name="heroAvatarThree" value="${escapeHtml(editingItem.detail?.avatarThree || "assets/images/avatar/03.jpg")}" />
              `}
            <input type="hidden" name="status" value="Active" />
            <input type="hidden" name="date" value="${escapeHtml(editingItem.date || new Date().toISOString().slice(0, 10))}" />
            <input type="hidden" name="metric" value="Hero" />
            <footer>
              <button class="dashboard-button dashboard-button--secondary" type="button" data-dashboard-close>Cancel</button>
              <button class="dashboard-button dashboard-button--primary" type="submit">Save avata</button>
            </footer>
          </form>
        </div>
      `;
      return;
    }

    if (activeType === "companies") {
      modalNode.innerHTML = `
        <div class="dashboard-modal__panel">
          <header>
            <div>
              <p>Company editor</p>
              <h2>${editingItem.id ? "Edit" : "Add"} Company</h2>
            </div>
            <button type="button" data-dashboard-close aria-label="Close editor">
              <i class="ri-close-line"></i>
            </button>
          </header>
          <form data-dashboard-form>
            <label>Company name<input name="title" value="${escapeHtml(editingItem.title)}" required /></label>
            <label>Position<input name="owner" value="${escapeHtml(editingItem.owner === "Company" ? "" : editingItem.owner)}" placeholder="UI/UX Designer" /></label>
            <label>Status
              <select name="status">
                <option ${editingItem.status === "Active" ? "selected" : ""}>Active</option>
                <option ${editingItem.status === "Draft" ? "selected" : ""}>Draft</option>
                <option ${editingItem.status === "Disabled" ? "selected" : ""}>Disabled</option>
              </select>
            </label>
            <label>Work period<input name="date" value="${escapeHtml(editingItem.date)}" placeholder="2024 - Present" /></label>
            <input type="hidden" name="metric" value="${escapeHtml(editingItem.metric || "99")}" />
            <input type="hidden" name="tags" value="Company" />
            <input type="hidden" name="link" value="${escapeHtml(editingItem.link || "#")}" />
            <input type="hidden" name="summary" value="" />
            ${mediaFields}
            <footer>
              <button class="dashboard-button dashboard-button--secondary" type="button" data-dashboard-close>Cancel</button>
              <button class="dashboard-button dashboard-button--primary" type="submit">Save company</button>
            </footer>
          </form>
        </div>
      `;
      return;
    }

    const isSocialEditor = activeType === "social";
    const isSkillsEditor = activeType === "skills";
    const ownerLabel = isSocialEditor ? "Icon class" : "Owner";
    const ownerPlaceholder = isSocialEditor ? "ri-instagram-line" : "";
    const ownerField = isSkillsEditor
      ? ""
      : `<label>${ownerLabel}<input name="owner" value="${escapeHtml(editingItem.owner)}" placeholder="${ownerPlaceholder}" /></label>`;
    const dateField = isSkillsEditor
      ? ""
      : `<label>Date<input name="date" type="date" value="${escapeHtml(editingItem.date)}" /></label>`;
    const linkField = isSkillsEditor
      ? ""
      : `<label class="dashboard-form__wide">Link<input name="link" value="${escapeHtml(editingItem.link || getDefaultItemLink(activeType))}" /></label>`;
    const metricLabel = isSocialEditor || isSkillsEditor ? "Display order" : "Metric";
    const metricPlaceholder = isSocialEditor || isSkillsEditor ? "1" : activeType === "projects" ? "1200x1000" : "Featured";
    const tagsField = isSocialEditor
      ? '<input type="hidden" name="tags" value="Social" />'
      : isSkillsEditor
        ? '<input type="hidden" name="tags" value="Skill" />'
        : `<label>Tags<input name="tags" value="${escapeHtml(editingItem.tags)}" /></label>`;
    const summaryLabel = isSocialEditor ? "Note" : "Summary";
    const summaryField = isSkillsEditor
      ? ""
      : `<label class="dashboard-form__wide">${summaryLabel}<textarea name="summary" rows="5">${escapeHtml(editingItem.summary)}</textarea></label>`;
    modalNode.innerHTML = `
      <div class="dashboard-modal__panel">
        <header>
          <div>
            <p>Content editor</p>
            <h2>${editingItem.id ? "Edit" : "Add"} ${dashboardLabels[activeType].singular}</h2>
          </div>
          <button type="button" data-dashboard-close aria-label="Close editor">
            <i class="ri-close-line"></i>
          </button>
        </header>
        <form data-dashboard-form>
          <label>Title<input name="title" value="${escapeHtml(editingItem.title)}" required /></label>
          ${ownerField}
          <label>Status
            <select name="status">
              <option ${editingItem.status === "Active" ? "selected" : ""}>Active</option>
              <option ${editingItem.status === "Draft" ? "selected" : ""}>Draft</option>
              <option ${editingItem.status === "Disabled" ? "selected" : ""}>Disabled</option>
            </select>
          </label>
          ${dateField}
          <label>${metricLabel}<input name="metric" value="${escapeHtml(editingItem.metric)}" placeholder="${metricPlaceholder}" /></label>
          ${tagsField}
          ${linkField}
          ${mediaFields}
          ${summaryField}
          ${activeType === "projects" ? renderProjectDetailFields() : ""}
          <footer>
            <button class="dashboard-button dashboard-button--secondary" type="button" data-dashboard-close>Cancel</button>
            <button class="dashboard-button dashboard-button--primary" type="submit">Save content</button>
          </footer>
        </form>
      </div>
    `;
  }

  function render() {
    renderHeader();
    renderNav();
    renderStats();
    renderStatuses();
    renderList();
    renderModal();
  }

  app.addEventListener("click", (event) => {
    const typeButton = event.target.closest("[data-dashboard-type]");
    const statusButton = event.target.closest("[data-dashboard-status]");
    const editButton = event.target.closest("[data-dashboard-edit]");
    const deleteButton = event.target.closest("[data-dashboard-delete]");
    const closeButton = event.target.closest("[data-dashboard-close]");
    const readButton = event.target.closest("[data-dashboard-read]");
    const logoResetButton = event.target.closest("[data-dashboard-logo-reset]");
    const toolRemoveButton = event.target.closest("[data-dashboard-tool-remove]");
    const addDetailBlockButton = event.target.closest("[data-dashboard-add-detail-block]");
    const removeDetailBlockButton = event.target.closest("[data-dashboard-remove-detail-block]");

    if (addDetailBlockButton) {
      const blocksNode = app.querySelector("[data-dashboard-flex-blocks]");
      if (blocksNode) {
        const type = addDetailBlockButton.dataset.dashboardAddDetailBlock || "text";
        blocksNode.insertAdjacentHTML("beforeend", renderProjectFlexibleBlock({ type }, Date.now()));
      }
      return;
    }

    if (removeDetailBlockButton) {
      removeDetailBlockButton.closest("[data-dashboard-flex-block]")?.remove();
      return;
    }

    if (toolRemoveButton) {
      const toolsInput = app.querySelector(".dashboard-project-tools input[name='tags']");
      if (toolsInput) {
        const toolToRemove = toolRemoveButton.dataset.dashboardToolRemove;
        toolsInput.value = String(toolsInput.value || "")
          .split(",")
          .map((tool) => tool.trim())
          .filter((tool) => tool && tool !== toolToRemove)
          .join(", ");
        const chip = toolRemoveButton.closest("span");
        chip?.remove();
      }
      return;
    }

    if (typeButton) {
      activeType = typeButton.dataset.dashboardType;
      activeStatus = "All";
      query = "";
      searchNode.value = "";
      editingItem = null;
      render();
    }

    if (statusButton) {
      activeStatus = statusButton.dataset.dashboardStatus;
      render();
    }

    if (editButton) {
      const itemId = Number(editButton.dataset.dashboardEdit);
      editingItem = data[activeType].find((item) => item.id === itemId);
      editingHeroSection = editButton.dataset.dashboardHeroSection || "";
      editingImage = editingItem?.image || "";
      editingImageMessage = "";
      if (activeType === "projects") {
        render();
      } else {
        renderModal();
      }
    }

    if (deleteButton) {
      const itemId = Number(deleteButton.dataset.dashboardDelete);
      const selectedItem = (data[activeType] || []).find((item) => item.id === itemId);
      data = {
        ...data,
        [activeType]: data[activeType].filter((item) => item.id !== itemId),
      };
      if (activeType === "contact") {
        deleteContactMessageFromFirebase(selectedItem).catch((error) => console.warn("Contact delete failed.", error));
      } else {
        setDashboardData(data);
      }
      render();
    }

    if (readButton) {
      const itemId = Number(readButton.dataset.dashboardRead);
      const selectedItem = (data.contact || []).find((item) => item.id === itemId);
      data = {
        ...data,
        contact: (data.contact || []).map((item) =>
          item.id === itemId ? { ...item, status: "Read" } : item
        ),
      };
      updateContactMessageInFirebase(selectedItem, { status: "Read" }).catch((error) => console.warn("Contact update failed.", error));
      render();
    }

    if (logoResetButton) {
      setSiteBranding("", "");
      renderList();
    }

    if (closeButton || event.target === modalNode) {
      editingItem = null;
      if (activeType === "projects") {
        render();
      } else {
        renderModal();
      }
    }
  });

  app.addEventListener("change", async (event) => {
    const flexibleUploadInput = event.target.closest("[data-dashboard-flex-image-upload]");

    if (flexibleUploadInput && flexibleUploadInput.files?.length) {
      const fieldName = flexibleUploadInput.dataset.dashboardFlexImageUpload;
      const dataUrl = await readFileAsDataUrl(flexibleUploadInput.files[0]);
      const urlInput = app.querySelector(`[data-dashboard-flex-image-url="${fieldName}"]`);
      const preview = app.querySelector(`[data-dashboard-flex-image-preview="${fieldName}"]`);

      if (urlInput) {
        urlInput.value = dataUrl;
      }
      if (preview) {
        preview.innerHTML = `<img src="${dataUrl}" alt="Project detail preview" />`;
      }
      return;
    }

    const detailUploadInput = event.target.closest("[data-dashboard-detail-image-upload]");

    if (detailUploadInput && detailUploadInput.files?.length) {
      const fieldName = detailUploadInput.dataset.dashboardDetailImageUpload;
      const dataUrl = await readFileAsDataUrl(detailUploadInput.files[0]);
      const urlInput = app.querySelector(`[data-dashboard-detail-image-url="${fieldName}"]`);
      const preview = app.querySelector(`[data-dashboard-detail-image-preview="${fieldName}"]`);

      if (urlInput) {
        urlInput.value = dataUrl;
      }
      if (preview) {
        preview.innerHTML = `<img src="${dataUrl}" alt="Project detail preview" />`;
      }
      return;
    }

    const heroAvatarUploadInput = event.target.closest("[data-dashboard-hero-avatar-upload]");

    if (heroAvatarUploadInput && heroAvatarUploadInput.files?.length) {
      const fieldName = heroAvatarUploadInput.dataset.dashboardHeroAvatarUpload;
      const imageResult = await optimizeImageForStorage(heroAvatarUploadInput.files[0], {
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.82,
      });
      const urlInput = app.querySelector(`[data-dashboard-hero-avatar-url="${fieldName}"]`);
      const preview = app.querySelector(`[data-dashboard-hero-avatar-preview="${fieldName}"]`);

      if (urlInput) {
        urlInput.value = imageResult.dataUrl;
      }
      if (preview) {
        preview.innerHTML = `<img src="${imageResult.dataUrl}" alt="Review avatar preview" />`;
      }
      return;
    }

    const logoUploadInput = event.target.closest("[data-dashboard-logo-upload]");
    const faviconUploadInput = event.target.closest("[data-dashboard-favicon-upload]");

    if (logoUploadInput && logoUploadInput.files?.length) {
      const dataUrl = await readFileAsDataUrl(logoUploadInput.files[0]);
      const logoUrlInput = app.querySelector("[data-dashboard-logo-url]");
      const logoPreview = app.querySelector("[data-site-logo-preview]");
      const logoMessage = app.querySelector("[data-dashboard-logo-message]");

      if (logoUrlInput) {
        logoUrlInput.value = dataUrl;
      }
      if (logoPreview) {
        logoPreview.src = dataUrl;
      }
      if (logoMessage) {
        logoMessage.textContent = "Logo is ready to save.";
      }
      return;
    }

    if (faviconUploadInput && faviconUploadInput.files?.length) {
      const dataUrl = await readFileAsDataUrl(faviconUploadInput.files[0]);
      const faviconUrlInput = app.querySelector("[data-dashboard-favicon-url]");
      const faviconPreview = app.querySelector("[data-site-favicon-preview]");
      const logoMessage = app.querySelector("[data-dashboard-logo-message]");

      if (faviconUrlInput) {
        faviconUrlInput.value = dataUrl;
      }
      if (faviconPreview) {
        faviconPreview.src = dataUrl;
      }
      if (logoMessage) {
        logoMessage.textContent = "Favicon is ready to save.";
      }
      return;
    }

    const uploadInput = event.target.closest("[data-dashboard-image-upload]");

    if (!uploadInput || !uploadInput.files?.length) {
      return;
    }

    const file = uploadInput.files[0];
    const preview = app.querySelector("[data-dashboard-image-preview]");
    const message = app.querySelector("[data-dashboard-image-message]");
    const urlInput = app.querySelector("[data-dashboard-image-url]");
    const imageResult = await optimizeImageForStorage(file, {
      maxWidth: activeType === "testimonials" || activeType === "skills" || activeType === "companies" ? 512 : 1200,
      maxHeight: activeType === "testimonials" || activeType === "skills" || activeType === "companies" ? 512 : 1000,
      quality: activeType === "testimonials" || activeType === "skills" || activeType === "companies" ? 0.82 : 0.78,
    });
    const dataUrl = imageResult.dataUrl;

    editingImage = dataUrl;
    editingImageMessage = imageResult.optimized
      ? `Image optimized from ${imageResult.originalWidth}x${imageResult.originalHeight}px to ${imageResult.width}x${imageResult.height}px so it can be saved in this browser.`
      : imageResult.width === 1200 && imageResult.height === 1000
        ? "Image size looks good: 1200x1000px."
        : `Uploaded image is ${imageResult.width}x${imageResult.height}px. Recommended size is 1200x1000px.`;

    if (preview) {
      preview.innerHTML = `<img src="${dataUrl}" alt="Project preview" />`;
    }

    if (message) {
      message.textContent = editingImageMessage;
    }

    if (urlInput) {
      urlInput.value = dataUrl;
    }
  });

  app.addEventListener("input", (event) => {
    const heroAvatarUrlInput = event.target.closest("[data-dashboard-hero-avatar-url]");

    if (heroAvatarUrlInput) {
      const fieldName = heroAvatarUrlInput.dataset.dashboardHeroAvatarUrl;
      const preview = app.querySelector(`[data-dashboard-hero-avatar-preview="${fieldName}"]`);

      if (preview) {
        preview.innerHTML = heroAvatarUrlInput.value
          ? `<img src="${escapeHtml(heroAvatarUrlInput.value)}" alt="Review avatar preview" />`
          : "<small>No avatar selected</small>";
      }
      return;
    }

    const flexibleImageUrlInput = event.target.closest("[data-dashboard-flex-image-url]");

    if (flexibleImageUrlInput) {
      const fieldName = flexibleImageUrlInput.dataset.dashboardFlexImageUrl;
      const preview = app.querySelector(`[data-dashboard-flex-image-preview="${fieldName}"]`);

      if (preview) {
        preview.innerHTML = flexibleImageUrlInput.value
          ? `<img src="${escapeHtml(flexibleImageUrlInput.value)}" alt="Project detail preview" />`
          : "<small>No image selected</small>";
      }
      return;
    }

    const detailImageUrlInput = event.target.closest("[data-dashboard-detail-image-url]");

    if (detailImageUrlInput) {
      const fieldName = detailImageUrlInput.dataset.dashboardDetailImageUrl;
      const preview = app.querySelector(`[data-dashboard-detail-image-preview="${fieldName}"]`);

      if (preview) {
        preview.innerHTML = detailImageUrlInput.value
          ? `<img src="${escapeHtml(detailImageUrlInput.value)}" alt="Project detail preview" />`
          : "<small>No image selected</small>";
      }
      return;
    }

    const summaryInput = event.target.closest("[data-dashboard-summary-input]");

    if (summaryInput) {
      const countNode = app.querySelector("[data-dashboard-summary-count]");
      if (countNode) {
        countNode.textContent = `${summaryInput.value.length}/180`;
      }
    }

    const imageUrlInput = event.target.closest("[data-dashboard-image-url]");

    if (imageUrlInput) {
      editingImage = imageUrlInput.value;
      editingImageMessage = editingImage
        ? "External image URL will be used for this project."
        : "";
      const preview = app.querySelector("[data-dashboard-image-preview]");
      const message = app.querySelector("[data-dashboard-image-message]");

      if (preview) {
        preview.innerHTML = editingImage
          ? `<img src="${escapeHtml(editingImage)}" alt="Project preview" />`
          : "<span>No image selected</span>";
      }

      if (message) {
        message.textContent = editingImageMessage;
      }
    }
  });

  app.addEventListener("submit", (event) => {
    const logoForm = event.target.closest("[data-dashboard-logo-form]");

    if (logoForm) {
      event.preventDefault();
      const logoInput = logoForm.querySelector("[data-dashboard-logo-url]");
      const faviconInput = logoForm.querySelector("[data-dashboard-favicon-url]");
      const logoMessage = logoForm.querySelector("[data-dashboard-logo-message]");
      const data = getDashboardData();
      data.branding = {
        logo: logoInput?.value?.trim() || "",
        favicon: faviconInput?.value?.trim() || "",
      };
      setSiteBranding(data.branding.logo, data.branding.favicon);
      setDashboardData(data);
      if (logoMessage) {
        logoMessage.textContent = "Logo and favicon saved across the website.";
      }
      renderList();
      return;
    }

    const form = event.target.closest("[data-dashboard-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(form);
    const item = {
      id: editingItem.id || Date.now(),
      title: String(formData.get("title") || "").trim(),
      owner: String(formData.get("owner") || "").trim() || (activeType === "social" ? "ri-global-line" : activeType === "skills" ? "Skill" : "Vien Nguyen"),
      status: String(formData.get("status") || "Draft"),
      date: String(formData.get("date") || new Date().toISOString().slice(0, 10)),
      metric:
        String(formData.get("metric") || "").trim() ||
        (activeType === "projects" ? "1200x1000" : activeType === "social" || activeType === "skills" ? "99" : "New item"),
      tags: String(formData.get("tags") || "").trim(),
      link: String(formData.get("link") || getDefaultItemLink(activeType)).trim(),
      image: editingImage,
      summary: activeType === "hero"
        ? String(formData.get("summary") || editingItem.summary || "").trim()
        : String(formData.get("summary") || "").trim(),
    };

    if (activeType === "projects") {
      const blockTypes = formData.getAll("detailBlockType");
      const blockTitles = formData.getAll("detailBlockTitle");
      const blockTexts = formData.getAll("detailBlockText");
      const blockImages = formData.getAll("detailBlockImage");
      const detailBlocks = blockTypes
        .map((type, index) => ({
          type: String(type || "text") === "image" ? "image" : "text",
          title: String(blockTitles[index] || "").trim(),
          text: String(blockTexts[index] || "").trim(),
          image: String(blockImages[index] || "").trim(),
        }))
        .filter((block) => block.title || block.text || block.image);

      item.detail = {
        region: String(formData.get("detailRegion") || "").trim(),
        year: String(formData.get("detailYear") || "").trim(),
        role: String(formData.get("detailRole") || "").trim(),
        service: String(formData.get("detailService") || "").trim(),
        overview: String(formData.get("detailOverview") || "").trim(),
        problem: String(formData.get("detailProblem") || "").trim(),
        goal: String(formData.get("detailGoal") || "").trim(),
        responsibilities: String(formData.get("detailResponsibilities") || "").trim(),
        research: String(formData.get("detailResearch") || "").trim(),
        painPoints: String(formData.get("detailPainPoints") || "").trim(),
        wireframes: String(formData.get("detailWireframes") || "").trim(),
        design: String(formData.get("detailDesign") || "").trim(),
        prototype: String(formData.get("detailPrototype") || "").trim(),
        impact: String(formData.get("detailImpact") || "").trim(),
        learned: String(formData.get("detailLearned") || "").trim(),
        nextSteps: String(formData.get("detailNextSteps") || "").trim(),
        researchImageOne: String(formData.get("detailResearchImageOne") || "").trim(),
        researchImageTwo: String(formData.get("detailResearchImageTwo") || "").trim(),
        wireframeImage: String(formData.get("detailWireframeImage") || "").trim(),
        mockupImageOne: String(formData.get("detailMockupImageOne") || "").trim(),
        mockupImageTwo: String(formData.get("detailMockupImageTwo") || "").trim(),
        mockupImageThree: String(formData.get("detailMockupImageThree") || "").trim(),
        mockupImageFour: String(formData.get("detailMockupImageFour") || "").trim(),
        blocks: detailBlocks,
      };
    }

    if (activeType === "hero") {
      const score = String(formData.get("heroReviewScore") || editingItem.detail?.reviewScore || "").trim();
      item.summary = String(item.summary || "100+ reviews").split(score).join("").replace(/\s+/g, " ").trim();
      item.id = 501;
      item.detail = {
        reviewScore: String(formData.get("heroReviewScore") || editingItem.detail?.reviewScore || "(4.96 of 5)").trim(),
        reviewDescription: String(formData.get("heroReviewDescription") || editingItem.detail?.reviewDescription || "Five-star reviews from my esteemed clients.").trim(),
        avatarOne: String(formData.get("heroAvatarOne") || editingItem.detail?.avatarOne || "assets/images/avatar/01.jpg").trim(),
        avatarTwo: String(formData.get("heroAvatarTwo") || editingItem.detail?.avatarTwo || "assets/images/avatar/02.jpg").trim(),
        avatarThree: String(formData.get("heroAvatarThree") || editingItem.detail?.avatarThree || "assets/images/avatar/03.jpg").trim(),
      };
      data = {
        ...data,
        hero: [item],
      };
    } else {
      const exists = data[activeType].some((contentItem) => contentItem.id === item.id);
      data = {
        ...data,
        [activeType]: exists
          ? data[activeType].map((contentItem) => (contentItem.id === item.id ? item : contentItem))
          : [item, ...data[activeType]],
      };
    }

    const saved = setDashboardData(data);
    if (!saved) {
      const errorMessage =
        "Ảnh vẫn quá nặng nên trình duyệt không lưu được. Hãy dùng ảnh nhỏ hơn hoặc dán URL ảnh.";
      editingImageMessage = errorMessage;
      const messageNode = app.querySelector("[data-dashboard-image-message]");
      if (messageNode) {
        messageNode.textContent = errorMessage;
      }
      return;
    }
    editingItem = null;
    editingHeroSection = "";
    render();
  });

  searchNode.addEventListener("input", (event) => {
    query = event.target.value;
    renderList();
  });

  addButton.addEventListener("click", () => {
    if (activeType === "contact") {
      return;
    }

    editingItem = {
      id: 0,
      title: "",
      owner: "",
      status: "Draft",
      date: new Date().toISOString().slice(0, 10),
      metric: activeType === "projects" ? "1200x1000" : "",
      tags: "",
      link: getDefaultItemLink(activeType),
      image: "",
      summary: "",
      detail:
        activeType === "projects"
          ? getProjectDetailDefaults({ date: new Date().toISOString().slice(0, 10) })
          : undefined,
    };
    editingImage = "";
    editingImageMessage = "";
    if (activeType === "projects") {
      render();
    } else {
      renderModal();
    }
  });

  render();
  refreshContactMessages();
  window.addEventListener("nino-dashboard-authenticated", refreshContactMessages);
  initFirebaseServices()
    .then(({ auth }) => auth.onAuthStateChanged((user) => {
      if (user) refreshContactMessages();
    }))
    .catch(() => {});
}

async function saveContactMessage(message) {
  const nextMessage = await submitContactMessageToFirebase(message);
  const data = getDashboardData();
  const contactMessages = data.contact || [];
  try {
    window.localStorage.setItem(
      dashboardStorageKey,
      JSON.stringify({
        ...data,
        contact: [nextMessage, ...contactMessages],
      })
    );
  } catch (error) {}
  window.dispatchEvent(new CustomEvent("nino-dashboard-updated", { detail: { ...data, contact: [nextMessage, ...contactMessages] } }));
}

function initContactCapture() {
  const form = document.querySelector("#contactForm");

  if (!form) {
    return;
  }

  function setContactFeedback(isSuccess, message) {
    const successNode = form.querySelector(".input-success");
    const errorNode = form.querySelector(".input-error");
    const submitNode = form.querySelector("#msgSubmit");

    if (successNode) {
      successNode.textContent = message;
      successNode.style.display = isSuccess ? "block" : "none";
    }

    if (errorNode) {
      errorNode.style.display = isSuccess ? "none" : "block";
    }

    if (submitNode) {
      submitNode.classList.remove("hidden");
      submitNode.className = isSuccess
        ? "h4 text-left tada animated text-success"
        : "h4 text-left text-danger";
      submitNode.textContent = message;
    }
  }

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const getValue = (selector) => form.querySelector(selector)?.value?.trim() || "";
      const message = {
        name: getValue("#name"),
        email: getValue("#email"),
        subject: getValue("#subject"),
        message: getValue("#message"),
      };

      if (!message.name || !message.email || !message.subject || !message.message) {
        setContactFeedback(false, "Please fill in all contact fields before sending.");
        return;
      }

      try {
        setContactFeedback(true, "Sending message...");
        await saveContactMessage(message);
        setContactFeedback(true, "Message sent. I will get back to you soon!");
        form.reset();
      } catch (error) {
        console.warn("Contact message save failed.", error);
        const detail = String(error?.message || error || "").toLowerCase();
        const code = String(error?.code || "").toLowerCase();
        const feedback = detail.includes("permission") || code.includes("permission-denied")
          ? "Contact is blocked by Firebase Rules. Publish the contact-messages Rules, then try again."
          : detail.includes("network") || code.includes("unavailable")
            ? "Unable to connect to Firebase. Please check your internet connection and try again."
            : "Message was not sent. Firebase error: " + (code || "unknown") + ".";
        setContactFeedback(false, feedback);
      }
    },
    true
  );
}



function getActiveSkillItems() {
  const data = getDashboardData();
  return (data.skills || [])
    .filter((item) => item.status === "Active" || item.status === "Published")
    .sort((first, second) => Number(first.metric || 99) - Number(second.metric || 99));
}

function renderSiteSkills() {
  const skillTrack = document.querySelector(".skill-marquee-track");

  if (!skillTrack) {
    return;
  }

  const skills = getActiveSkillItems();

  if (!skills.length) {
    skillTrack.innerHTML = "";
    return;
  }

  const marqueeItems = skills.concat(skills);
  skillTrack.innerHTML = marqueeItems
    .map(
      (skill, index) => `
        <div class="skill-marquee-item">
          <div class="skill-item wow fadeInUp delay-0-${(index % 4) + 2}s">
            <img src="${escapeHtml(skill.image || "assets/images/skills/skill1.png")}" alt="${escapeHtml(skill.title)}" />
            <h5>${escapeHtml(skill.title)}</h5>
          </div>
        </div>
      `
    )
    .join("");
}

function initSiteSkills() {
  renderSiteSkills();
  window.addEventListener("nino-dashboard-updated", renderSiteSkills);
  window.addEventListener("storage", (event) => {
    if (event.key === dashboardStorageKey) {
      renderSiteSkills();
    }
  });
}

function renderSiteHero() {
  const data = getDashboardData();
  const hero = (data.hero || dashboardSeed.hero)[0] || dashboardSeed.hero[0];
  const titleNode = document.querySelector("[data-site-hero-title]");
  const imageNode = document.querySelector("[data-site-hero-image]");
  const descriptionNode = document.querySelector("[data-site-hero-description]");
  const buttonNode = document.querySelector("[data-site-hero-button]");
  const reviewNode = document.querySelector("[data-site-hero-review]");
  const reviewAvatarsNode = document.querySelector("[data-site-hero-review-avatars]");

  if (titleNode) {
    titleNode.textContent = hero.title || "Vien Nguyen";
  }

  if (imageNode) {
    imageNode.src = hero.image || "assets/images/about/me.jpg";
    imageNode.alt = hero.title || "Vien Nguyen";
  }

  if (descriptionNode) {
    descriptionNode.textContent = hero.owner || "";
  }

  if (buttonNode) {
    buttonNode.textContent = hero.tags || "Get In touch";
    buttonNode.href = hero.link || "/contact/";
  }

  if (reviewNode) {
    const reviewScore = hero.detail?.reviewScore || "(4.96 of 5)";
    const reviewText = String(hero.summary || "100+ reviews")
      .split(String(reviewScore || "")).join("")
      .replace(/\s+/g, " ")
      .trim();
    const reviewDescription = hero.detail?.reviewDescription || "Five-star reviews from my esteemed clients.";
    reviewNode.innerHTML = `${escapeHtml(reviewText)} <span>${escapeHtml(reviewScore)}</span><p>${escapeHtml(reviewDescription)}</p>`;
  }

  if (reviewAvatarsNode) {
    const avatars = [
      hero.detail?.avatarOne || "assets/images/avatar/01.jpg",
      hero.detail?.avatarTwo || "assets/images/avatar/02.jpg",
      hero.detail?.avatarThree || "assets/images/avatar/03.jpg",
    ].filter(Boolean);

    reviewAvatarsNode.innerHTML = avatars
      .map((avatar, index) => `
        <li>
          <img class="img-fluid" src="${escapeHtml(avatar)}" alt="client ${index + 1}" />
        </li>
      `)
      .join("");
  }
}

function initSiteHero() {
  renderSiteHero();
  window.addEventListener("nino-dashboard-updated", renderSiteHero);
  window.addEventListener("storage", (event) => {
    if (event.key === dashboardStorageKey) {
      renderSiteHero();
    }
  });
}

function getActiveCompanyItems() {
  const data = getDashboardData();
  return (data.companies || [])
    .filter((item) => item.status === "Active" || item.status === "Published")
    .sort((first, second) => Number(first.metric || 99) - Number(second.metric || 99));
}

function renderSiteCompanies() {
  const companyTrack = document.querySelector(".company-list .scroller__inner");

  if (!companyTrack) {
    return;
  }

  const companies = getActiveCompanyItems();

  if (!companies.length) {
    companyTrack.innerHTML = "";
    return;
  }

  const marqueeItems = companies.length > 1 ? companies.concat(companies) : companies;
  companyTrack.innerHTML = marqueeItems
    .map((company) => {
      const image = company.image || "assets/images/client-logos/partner1.png";
      const logo = `<img src="${escapeHtml(image)}" alt="${escapeHtml(company.title)}" loading="lazy" />`;
      const href = company.link || "#";
      const targetAttrs = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return href && href !== "#"
        ? `<a class="company-logo-link" href="${escapeHtml(href)}"${targetAttrs}>${logo}</a>`
        : logo;
    })
    .join("");
}

function initSiteCompanies() {
  renderSiteCompanies();
  window.addEventListener("nino-dashboard-updated", renderSiteCompanies);
  window.addEventListener("storage", (event) => {
    if (event.key === dashboardStorageKey) {
      renderSiteCompanies();
    }
  });
}

function getActiveSocialItems() {
  const data = getDashboardData();
  return (data.social || [])
    .filter((item) => item.status === "Active" || item.status === "Published")
    .sort((first, second) => Number(first.metric || 99) - Number(second.metric || 99));
}

function renderSiteSocials() {
  const socialLists = document.querySelectorAll(".about-social ul");

  if (!socialLists.length) {
    return;
  }

  const socials = getActiveSocialItems();

  if (!socials.length) {
    return;
  }

  const markup = socials
    .map((item) => {
      const href = item.link || "#";
      const targetAttrs = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      const iconClass = item.owner || "ri-global-line";

      return `<li><a href="${escapeHtml(href)}" aria-label="${escapeHtml(item.title)}"${targetAttrs}><i class="${escapeHtml(iconClass)}"></i></a></li>`;
    })
    .join("");

  socialLists.forEach((list) => {
    list.innerHTML = markup;
  });
}

function initSiteSocials() {
  renderSiteSocials();
  window.addEventListener("nino-dashboard-updated", renderSiteSocials);
  window.addEventListener("storage", (event) => {
    if (event.key === dashboardStorageKey) {
      renderSiteSocials();
    }
  });
}

function renderProjectDetailPage() {
  const page = document.querySelector(".project-case-study");

  if (!page) {
    return;
  }

  const data = getDashboardData();
  const params = new URLSearchParams(window.location.search);
  const selectedId = Number(params.get("id"));
  const projects = data.projects || [];
  const project =
    projects.find((item) => Number(item.id) === selectedId) ||
    projects.find((item) => item.status === "Active") ||
    projects[0] ||
    dashboardSeed.projects[0];
  const detail = getProjectDetailDefaults(project);
  const image = project.image || "assets/images/projects/work2.jpg";
  const projectDetailLink = getProjectDetailLink(project);
  const demoLink = String(project.link || "").trim();
  const hasDemoLink =
    demoLink &&
    demoLink !== "#" &&
    demoLink !== "/single-project/" &&
    demoLink !== projectDetailLink &&
    !demoLink.startsWith("/single-project/?");
  const demoHref = hasDemoLink ? demoLink : "#";
  const demoLinkAttrs = /^https?:\/\//i.test(demoHref)
    ? ' target="_blank" rel="noopener noreferrer"'
    : hasDemoLink
      ? ""
      : ' aria-disabled="true" tabindex="-1"';
  const listItems = (value) =>
    String(value || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  const responsibilities = listItems(detail.responsibilities);
  const painPoints = listItems(detail.painPoints);
  const nextSteps = listItems(detail.nextSteps);
  const flexibleBlocks = (Array.isArray(detail.blocks) ? detail.blocks : []).filter(
    (block) => block && (block.title || block.text || block.image)
  );
  const renderFlexibleBlock = (block, index) => {
    const title = block.title || (block.type === "image" ? `Project image ${index + 1}` : "Project note");
    if (block.type === "image") {
      return block.image
        ? `<figure class="project-case-flex-block project-case-flex-block--image"><img src="${escapeHtml(block.image)}" alt="${escapeHtml(title)}" />${block.title || block.text ? `<figcaption>${block.title ? `<strong>${escapeHtml(block.title)}</strong>` : ""}${block.text ? `<span>${escapeHtml(block.text)}</span>` : ""}</figcaption>` : ""}</figure>`
        : "";
    }
    return `<article class="project-case-flex-block project-case-flex-block--text">${block.title ? `<h3>${escapeHtml(block.title)}</h3>` : ""}${block.text ? `<p>${escapeHtml(block.text)}</p>` : ""}${block.image ? `<img src="${escapeHtml(block.image)}" alt="${escapeHtml(title)}" />` : ""}</article>`;
  };

  page.innerHTML = `
    <section class="project-case-hero" id="overview">
      <div class="container">
        <div class="project-case-kicker">${escapeHtml(project.tags || "Project case study")}</div>
        <div class="project-case-hero__grid">
          <div>
            <h1>${escapeHtml(project.title)}</h1>
            <p>${escapeHtml(project.summary || detail.overview)}</p>
            <div class="project-case-actions"><a class="theme-btn project-case-demo${hasDemoLink ? "" : " is-disabled"}" href="${escapeHtml(demoHref)}"${demoLinkAttrs}>Demo Project <i class="ri-arrow-right-line"></i></a></div>
          </div>
          <div class="project-case-meta" aria-label="Project information">
            <article><span>Region</span><strong>${escapeHtml(detail.region)}</strong></article>
            <article><span>Year</span><strong>${escapeHtml(detail.year)}</strong></article>
            <article><span>Role</span><strong>${escapeHtml(detail.role)}</strong></article>
            <article><span>Service</span><strong>${escapeHtml(detail.service)}</strong></article>
          </div>
        </div>
        <div class="project-case-hero__media"><img src="${escapeHtml(image)}" alt="${escapeHtml(project.title)}" /></div>
      </div>
    </section>
    <section class="project-case-section project-case-section--intro">
      <div class="container">
        <div class="project-case-copy-grid">
          <div><p class="project-case-eyebrow">The project itself</p><h2>Project Overview</h2></div>
          <div class="project-case-richtext">
            <p>${escapeHtml(detail.overview)}</p>
            <div class="project-case-two-col">
              <article><h3>Problem</h3><p>${escapeHtml(detail.problem)}</p></article>
              <article><h3>Goal</h3><p>${escapeHtml(detail.goal)}</p></article>
            </div>
            <div class="project-case-role-list"><h3>Responsibilities</h3><ul>${responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          </div>
        </div>
      </div>
    </section>
    <section class="project-case-section" id="research">
      <div class="container">
        <p class="project-case-eyebrow">All about the user</p><h2>User Research</h2>
        <p class="project-case-lead">${escapeHtml(detail.research)}</p>
        <div class="project-case-card-grid">${painPoints.map((point, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(point)}</h3><p>Key insight identified during research and translated into a design decision.</p></article>`).join("")}</div>
        <div class="project-case-image-row"><img src="${escapeHtml(detail.researchImageOne)}" alt="${escapeHtml(project.title)} research" /><img src="${escapeHtml(detail.researchImageTwo)}" alt="${escapeHtml(project.title)} user journey" /></div>
      </div>
    </section>
    <section class="project-case-section" id="wireframes">
      <div class="container">
        <p class="project-case-eyebrow">The project schematically</p><h2>Starting the Design</h2>
        <p class="project-case-lead">${escapeHtml(detail.wireframes)}</p>
        <div class="project-case-timeline">
          <article><h3>App map</h3><p>Define the main screens, page hierarchy, and navigation logic.</p></article>
          <article><h3>Paper wireframes</h3><p>Explore early layout ideas quickly before committing to digital screens.</p></article>
          <article><h3>Digital wireframes</h3><p>Turn structure into a clearer flow that can be reviewed and tested.</p></article>
          <article><h3>Usability studies</h3><p>Identify friction and refine the product direction before visual polish.</p></article>
        </div>
        <div class="project-case-wide-image"><img src="${escapeHtml(detail.wireframeImage)}" alt="Wireframe planning screens" /></div>
      </div>
    </section>
    <section class="project-case-section" id="design">
      <div class="container">
        <p class="project-case-eyebrow">The clear version</p><h2>Refining Design</h2>
        <p class="project-case-lead">${escapeHtml(detail.design)}</p>
        <div class="project-case-mockups"><img src="${escapeHtml(detail.mockupImageOne)}" alt="${escapeHtml(project.title)} mockup" /><img src="${escapeHtml(detail.mockupImageTwo)}" alt="Detail mockup" /><img src="${escapeHtml(detail.mockupImageThree)}" alt="Interface mockup" /><img src="${escapeHtml(detail.mockupImageFour)}" alt="Profile mockup" /></div>
        <div class="project-case-prototype"><div><h3>High-fidelity prototype</h3><p>${escapeHtml(detail.prototype)}</p></div><ol>${nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></div>
      </div>
    </section>
    ${flexibleBlocks.length ? `
    <section class="project-case-section project-case-section--flexible">
      <div class="container">
        <div class="project-case-flexible">
          ${flexibleBlocks.map(renderFlexibleBlock).join("")}
        </div>
      </div>
    </section>` : ""}
    <section class="project-case-section project-case-section--outcome" id="outcome">
      <div class="container">
        <p class="project-case-eyebrow">The result</p><h2>Outcome</h2>
        <div class="project-case-outcome-grid">
          <article><h3>Impact</h3><p>${escapeHtml(detail.impact)}</p></article>
          <article><h3>What I learned</h3><p>${escapeHtml(detail.learned)}</p></article>
          <article><h3>Next steps</h3><p>${nextSteps.map(escapeHtml).join(". ")}</p></article>
        </div>
      </div>
    </section>
  `;
}

function initProjectCards() {
  const projectGrid = document.querySelector("[data-project-card-grid]");

  if (!projectGrid) {
    return;
  }

  const isHomeProjectSection = Boolean(projectGrid.closest(".projects-area"));
  let viewAllWrap = projectGrid.parentElement?.querySelector("[data-project-view-all]");

  if (isHomeProjectSection && !viewAllWrap) {
    viewAllWrap = document.createElement("div");
    viewAllWrap.className = "project-card-actions";
    viewAllWrap.setAttribute("data-project-view-all", "");
    viewAllWrap.innerHTML = `
      <a class="theme-btn project-card-view-all" href="/projects/">
        View all project <i class="ri-arrow-right-line"></i>
      </a>
    `;
    projectGrid.insertAdjacentElement("afterend", viewAllWrap);
  }

  function getHomeProjectLimit() {
    return window.matchMedia("(max-width: 1020px) and (min-width: 641px)").matches ? 4 : 3;
  }

  function renderProjectCards() {
    const data = getDashboardData();
    const projects = (data.projects || []).filter((project) => project.status === "Active" || project.status === "Published");
    const homeProjectLimit = getHomeProjectLimit();
    const visibleProjects = isHomeProjectSection && projects.length > homeProjectLimit ? projects.slice(0, homeProjectLimit) : projects;

    projectGrid.innerHTML = visibleProjects
      .map(
        (project) => `
          <article class="project-card">
            <a href="${escapeHtml(getProjectDetailLink(project))}" class="project-card__image">
              <img src="${escapeHtml(project.image || "assets/images/projects/work1.jpg")}" alt="${escapeHtml(project.title)}" loading="lazy" />
            </a>
            <div class="project-card__content">
              <div>
                <span>${escapeHtml(project.tags || "Project")}</span>
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.summary)}</p>
              </div>
              <a href="${escapeHtml(getProjectDetailLink(project))}" class="project-card__link">
                View Project <i class="ri-arrow-right-line"></i>
              </a>
            </div>
          </article>
        `
      )
      .join("");

    if (viewAllWrap) {
      viewAllWrap.hidden = projects.length <= homeProjectLimit;
    }
  }

  renderProjectCards();
  window.addEventListener("resize", renderProjectCards);
  window.addEventListener("nino-dashboard-updated", renderProjectCards);
  window.addEventListener("storage", (event) => {
    if (event.key === dashboardStorageKey) {
      renderProjectCards();
    }
  });
}

function initManagedContentSections() {
  const blogList = document.querySelector("[data-blog-list]");
  const testimonialList = document.querySelector("[data-testimonial-list]");
  if (!blogList && !testimonialList) {
    return;
  }

  function getPublishedItems(type) {
    const data = getDashboardData();
    return (data[type] || []).filter((item) => item.status === "Active" || item.status === "Published");
  }

  function renderBlogList() {
    if (!blogList) {
      return;
    }

    const blogImages = [
      "assets/images/blog/blog1.jpg",
      "assets/images/blog/blog2.jpg",
      "assets/images/blog/blog3.jpg",
    ];
    const posts = getPublishedItems("blog");

    blogList.innerHTML = posts
      .map(
        (post, index) => `
          <article class="postbox__item format-image transition-3 mb-12">
            <div class="postbox__thumb w-img">
              <a href="${escapeHtml(post.link || "/blog-details/")}">
                <img src="${escapeHtml(post.image || blogImages[index % blogImages.length])}" alt="${escapeHtml(post.title)}" />
              </a>
            </div>
            <div class="postbox__content">
              <div class="postbox__meta">
                <span><a href="${escapeHtml(post.link || "/blog-details/")}"><i class="fa-light fa-user"></i>${escapeHtml(post.owner)}</a></span>
                <span><a href="${escapeHtml(post.link || "/blog-details/")}"><i class="fa-light fa-clock"></i>${escapeHtml(post.date)}</a></span>
                <span><a href="${escapeHtml(post.link || "/blog-details/")}"><i class="fa-sharp fa-thin fa-comments"></i>${escapeHtml(post.metric)}</a></span>
              </div>
              <h3 class="postbox__title">
                <a href="${escapeHtml(post.link || "/blog-details/")}">${escapeHtml(post.title)}</a>
              </h3>
              <div class="postbox__text">
                <p>${escapeHtml(post.summary)}</p>
              </div>
              <div class="postbox__read-more">
                <a href="${escapeHtml(post.link || "/blog-details/")}" class="theme-btn">Read more</a>
              </div>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderTestimonials() {
    if (!testimonialList) {
      return;
    }

    const avatars = [
      "assets/images/testimonials/author1.jpg",
      "assets/images/testimonials/author2.jpg",
      "assets/images/testimonials/author3.jpg",
      "assets/images/testimonials/author4.jpg",
      "assets/images/testimonials/author5.jpg",
    ];
    const testimonials = getPublishedItems("testimonials");
    const renderCard = (testimonial, index, isMarquee = false) => `
      <div class="${isMarquee ? "testimonial-marquee__item" : "col-span-12 md:col-span-6 lg:col-span-4"}">
        <a class="testimonial-link" href="${escapeHtml(testimonial.link || "/#testimonials")}">
          <div class="testimonial-item">
            <div class="author">
              <img src="${escapeHtml(testimonial.image || avatars[index % avatars.length])}" alt="${escapeHtml(testimonial.owner)}" />
            </div>
            <div class="text">${escapeHtml(testimonial.summary)}</div>
            <div class="testi-des">
              <h5>${escapeHtml(testimonial.owner)}</h5>
              <span>${escapeHtml(testimonial.title)}</span>
            </div>
          </div>
        </a>
      </div>
    `;

    if (testimonials.length > 3) {
      const marqueeItems = testimonials.concat(testimonials);
      testimonialList.className = "testimonial-marquee";
      testimonialList.innerHTML = `
        <div class="testimonial-marquee__track">
          ${marqueeItems.map((testimonial, index) => renderCard(testimonial, index, true)).join("")}
        </div>
      `;
      return;
    }

    testimonialList.className = "grid grid-cols-12 gap-6";
    testimonialList.innerHTML = testimonials.map((testimonial, index) => renderCard(testimonial, index)).join("");
  }

  function renderManagedSections() {
    renderBlogList();
    renderTestimonials();
  }

  renderManagedSections();
  window.addEventListener("nino-dashboard-updated", renderManagedSections);
  window.addEventListener("storage", (event) => {
    if (event.key === dashboardStorageKey) {
      renderManagedSections();
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  window.__ninoFirestoreContactForm = true;
  initContactCapture();
  applySiteBranding(defaultSiteLogo, defaultSiteFavicon);
  await hydrateDashboardDataFromFirebase();
  setSiteBranding("", "");
  initDashboardAuth();
  initDashboard();
  initSiteHero();
  initSiteSocials();
  initSiteCompanies();
  initSiteSkills();
  renderProjectDetailPage();
  initProjectCards();
  initManagedContentSections();
});
