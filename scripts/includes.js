// Người phụ trách: Bình. Các việc cần làm: Viết logic JS, xử lý sự kiện, tối ưu hiệu năng */
const includeTargets = Array.from(document.querySelectorAll("[data-include]"));

async function loadPartial(target) {
  const sourcePath = target.getAttribute("data-include");

  if (!sourcePath) {
    return;
  }

  try {
    const response = await fetch(sourcePath, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Cannot load partial: ${sourcePath}`);
    }

    const html = await response.text();
    target.outerHTML = html;
  } catch (error) {
    console.error(error);
    target.innerHTML = "";
    target.hidden = true;
  }
}

Promise.all(includeTargets.map(loadPartial))
  .then(() => {
    initTestimonialCarousel();
  })
  .catch((error) => {
    console.error("Failed to load page components", error);
  });

function initTestimonialCarousel() {
  const track = document.getElementById("testimonialTrack");
  if (!track) return;

  // Clone the content once for seamless infinite marquee effect
  const originalContent = track.innerHTML;
  track.innerHTML = originalContent + originalContent;
}
