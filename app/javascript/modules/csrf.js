const selector = document.querySelector("meta[name='csrf-token']")

const csrf = selector ? selector.getAttribute("content") : null;

export default csrf;
