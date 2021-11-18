const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
let tabFocus = 0

tabList.addEventListener('keydown', changeTabFocus);
tabs.forEach(tab => {
    tab.addEventListener('click', changeTabPanel);
})

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus === tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }
        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image');
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    hideContent(mainContainer, '[role="tab"]', 'aria-selected', false);
    targetTab.setAttribute('aria-selected', true);


    hideContent(mainContainer, '[role="tabpanel"]', 'hidden', true);
    showContent(mainContainer, `#${targetPanel}`);


    hideContent(mainContainer, 'picture', 'hidden', true);
    showContent(mainContainer, `#${targetImage}`);

}

function hideContent(parent, content, attribute, value) {
    parent
        .querySelectorAll(content)
        .forEach(item => item.setAttribute(attribute, value));

}

function showContent(parent, content) {
    parent
        .querySelector(content).removeAttribute('hidden');
}