document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu dropdown
  const mobileMenuButton = document.querySelector("#mobile-dropdown-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  mobileMenuButton.addEventListener("click", () =>
    mobileMenu.classNameList.toggle("hidden")
  );

  // Profile dropdown
  const profileButton = document.querySelector("#user-menu-button");
  const profileDropdown = document.querySelector("#user-menu");

  profileButton.addEventListener("click", () =>
    profileDropdown.classNameList.toggle("hidden")
  );
});
