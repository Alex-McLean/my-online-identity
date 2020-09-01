interface PrivacyParagraphArgs {
  setting: chrome.types.ChromeSetting;
  span: {
    label: string;
    trueText: string;
    falseText: string;
  };
  button: {
    trueText: string;
    falseText: string;
  };
}
const createPrivacyParagraph = (props: PrivacyParagraphArgs): void => {
  props.setting.get({}, (details) => {
    const privacyDiv = document.getElementById('privacyDiv');
    if (!privacyDiv) return;

    const privacyParagraph = document.createElement('p');

    const privacySpan = document.createElement('span');
    privacySpan.innerText = `${props.span.label}: `;
    privacySpan.innerText += details.value ? props.span.trueText : props.span.falseText;
    privacyParagraph.appendChild(privacySpan);

    const privacyButton = document.createElement('button');
    privacyButton.className = 'privacy-button';
    privacyButton.innerText = details.value ? props.button.trueText : props.button.falseText;
    privacyButton.onclick = (): void => {
      const newValue = privacyButton.innerText === props.button.trueText;
      props.setting.set({ value: newValue }, () => {
        privacySpan.innerText = newValue ? props.span.trueText : props.span.falseText;
        privacyButton.innerText = newValue ? props.button.trueText : props.button.falseText;
      });
    };
    privacyParagraph.appendChild(privacyButton);

    privacyDiv.appendChild(privacyParagraph);
  });
};

export const constructPrivacy = (): void => {
  createPrivacyParagraph({
    setting: chrome.privacy.services.autofillCreditCardEnabled,
    span: {
      label: 'Credit Card Autofill',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    button: {
      trueText: 'Enable',
      falseText: 'Disable',
    },
  });

  createPrivacyParagraph({
    setting: chrome.privacy.websites.thirdPartyCookiesAllowed,
    span: {
      label: 'Third Party Cookies',
      trueText: 'Allowed',
      falseText: 'Blocked',
    },
    button: {
      trueText: 'Allow',
      falseText: 'Block',
    },
  });

  createPrivacyParagraph({
    setting: chrome.privacy.websites.referrersEnabled,
    span: {
      label: 'Referrers',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    button: {
      trueText: 'Enable',
      falseText: 'Disable',
    },
  });

  createPrivacyParagraph({
    setting: chrome.privacy.websites.doNotTrackEnabled,
    span: {
      label: 'Do Not Track',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    button: {
      trueText: 'Enable',
      falseText: 'Disable',
    },
  });
};
