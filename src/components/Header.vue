<template>
  <header>
    <div class="container">
      <div class="header__wrapper">
        <a class="header__logo" href="/">
          <img src="~@/assets/logo/adyenfx.svg" alt="" />
        </a>
        <nav>
          <a class="nav__link" target="_blank" href="https://adyen.com">
            <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Back to Main</a
          >
        </nav>
      </div>
    </div>
    <nav></nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped></style>
