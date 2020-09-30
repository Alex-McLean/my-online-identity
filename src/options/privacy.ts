import { PrivacyParagraphArgs, PRIVACY_SETTINGS } from './privacySettings';

const createRecommendedSettingsButton = (settings: PrivacyParagraphArgs[]): void => {
  const recommendedSettingsButton = document.getElementById('privacy-button');
  if (!recommendedSettingsButton) return;

  recommendedSettingsButton.onclick = (): void => {
    settings.forEach((setting) => {
      const privacySettingSelectId = `privacy-setting-select-${setting.strings.label
        .toLocaleLowerCase()
        .replace(/ /g, '-')}`;
      const privacySettingSelect = document.getElementById(privacySettingSelectId);
      if (!privacySettingSelect) return;

      const recommendedValue = setting.recommended ? setting.strings.trueText : setting.strings.falseText;
      (privacySettingSelect as HTMLSelectElement).value = recommendedValue;
      privacySettingSelect.dispatchEvent(new Event('change'));
    });
  };
};

const createPrivacySettingDiv = (args: PrivacyParagraphArgs): void => {
  args.setting.get({}, (details) => {
    const privacyDiv = document.getElementById('privacy-body');
    if (!privacyDiv) return;

    const privacySettingDiv = document.createElement('div');
    privacySettingDiv.id = `privacy-setting-${args.strings.label.toLocaleLowerCase().replace(/ /g, '-')}`;
    privacySettingDiv.className = 'privacy-setting';

    const privacySettingHeader = document.createElement('div');
    privacySettingHeader.className = 'privacy-setting-header';
    privacySettingDiv.appendChild(privacySettingHeader);

    const privacySettingTitle = document.createElement('div');
    privacySettingTitle.className = 'privacy-setting-title';
    privacySettingTitle.innerText = args.strings.label;
    privacySettingHeader.appendChild(privacySettingTitle);

    const privacySettingSelect = document.createElement('select');
    privacySettingSelect.id = `privacy-setting-select-${args.strings.label.toLocaleLowerCase().replace(/ /g, '-')}`;
    privacySettingSelect.className = `privacy-setting-select ${details.value === args.recommended ? 'ok' : 'warn'}`;
    privacySettingSelect.onchange = (e: Event): void => {
      const target = e.currentTarget;
      if (!target) return;
      const newValue = (target as HTMLSelectElement).value === args.strings.trueText;
      args.setting.set({ value: newValue }, () => {
        privacySettingSelect.className = `privacy-setting-select ${newValue === args.recommended ? 'ok' : 'warn'}`;
      });
    };
    [args.strings.trueText, args.strings.falseText].forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerText = option;
      optionElement.className = `privacy-setting-option ${
        (option === args.strings.trueText) === args.recommended ? 'ok' : 'warn'
      }`;
      privacySettingSelect.appendChild(optionElement);
    });
    privacySettingSelect.value = details.value ? args.strings.trueText : args.strings.falseText;
    privacySettingHeader.appendChild(privacySettingSelect);

    const privacySettingDetails = document.createElement('div');
    privacySettingDetails.className = 'privacy-setting-details';

    const privacySettingRecommendation = document.createElement('div');
    privacySettingRecommendation.className = 'privacy-setting-details-recommendation';
    privacySettingRecommendation.innerText = `Recommended: ${
      args.recommended ? args.strings.trueText : args.strings.falseText
    }`;
    privacySettingDetails.appendChild(privacySettingRecommendation);

    const privacySettingDetailsBody = document.createElement('div');
    privacySettingDetailsBody.className = 'privacy-setting-details-body';
    privacySettingDetailsBody.innerText = args.details;
    privacySettingDetails.appendChild(privacySettingDetailsBody);

    privacySettingDiv.appendChild(privacySettingDetails);

    privacyDiv.appendChild(privacySettingDiv);
  });
};

export const constructPrivacy = (): void => {
  createRecommendedSettingsButton(PRIVACY_SETTINGS);

  PRIVACY_SETTINGS.forEach((setting) => void createPrivacySettingDiv(setting));
};
