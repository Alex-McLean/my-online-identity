/**
 * Construct all DOM elements for the Browser Privacy page of the options interface
 */

import { PrivacyParagraphArgs, PRIVACY_SETTINGS } from './privacySettings';

/**
 * Create the functionality for the button which sets all privacy settings to those we recommend
 */
const createRecommendedSettingsButton = (settings: PrivacyParagraphArgs[]): void => {
  // Get button in DOM
  const recommendedSettingsButton = document.getElementById('privacy-button');
  if (!recommendedSettingsButton) return;

  // Set button onclick listener
  recommendedSettingsButton.onclick = (): void => {
    // Iterate through each setting and update it
    settings.forEach((setting) => {
      // Find the setting select DOM element
      const privacySettingSelectId = `privacy-setting-select-${setting.strings.label
        .toLocaleLowerCase()
        .replace(/ /g, '-')}`;
      const privacySettingSelect = document.getElementById(privacySettingSelectId) as HTMLSelectElement | null;
      if (!privacySettingSelect) return;

      // Set the value of the select DOM element programmatically and fire the change event
      const recommendedValue = setting.recommended ? setting.strings.trueText : setting.strings.falseText;
      privacySettingSelect.value = recommendedValue;
      privacySettingSelect.dispatchEvent(new Event('change'));
    });
  };
};

/**
 * Create a privacy setting element based on the given args
 */
const createPrivacySettingDiv = (args: PrivacyParagraphArgs): void => {
  // Get the user's current value for the setting
  args.setting.get({}, (details) => {
    // Get the parent DOM element
    const privacyDiv = document.getElementById('privacy-body');
    if (!privacyDiv) return;

    // Store flag if selected value matches recommended value
    const isRecommendedValueSelected = details.value === args.recommended;

    // Create the container div
    const privacySettingDiv = document.createElement('div');
    privacySettingDiv.id = `privacy-setting-${args.strings.label.toLocaleLowerCase().replace(/ /g, '-')}`;
    privacySettingDiv.className = 'privacy-setting';

    // Create the header div and add to container
    const privacySettingHeader = document.createElement('div');
    privacySettingHeader.className = 'privacy-setting-header';
    privacySettingDiv.appendChild(privacySettingHeader);

    // Create the title div and add to header
    const privacySettingTitle = document.createElement('div');
    privacySettingTitle.className = 'privacy-setting-title font-medium';
    privacySettingTitle.innerText = args.strings.label;
    privacySettingHeader.appendChild(privacySettingTitle);

    // Create the privacy setting select element and add to header
    const privacySettingSelect = document.createElement('select');
    privacySettingSelect.id = `privacy-setting-select-${args.strings.label.toLocaleLowerCase().replace(/ /g, '-')}`;
    privacySettingSelect.className = `privacy-setting-select ${isRecommendedValueSelected ? 'ok' : 'warn'}`;
    privacySettingHeader.appendChild(privacySettingSelect);

    // Set the select element's onchange handler
    privacySettingSelect.onchange = (e: Event): void => {
      const target = e.currentTarget;
      if (!target) return;

      const newValue = (target as HTMLSelectElement).value === args.strings.trueText;

      // Update the user's settings based on changes to the select value
      args.setting.set({ value: newValue }, () => {
        privacySettingSelect.className = `privacy-setting-select ${newValue === args.recommended ? 'ok' : 'warn'}`;
      });
    };

    // Add options to the privacy setting select
    [args.strings.trueText, args.strings.falseText].forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerText = option;
      optionElement.className = `privacy-setting-option ${
        (option === args.strings.trueText) === args.recommended ? 'ok' : 'warn'
      }`;
      privacySettingSelect.appendChild(optionElement);
    });

    // Set the default value of the privacy setting select
    privacySettingSelect.value = details.value ? args.strings.trueText : args.strings.falseText;

    // Create privacy setting details div and to container
    const privacySettingDetails = document.createElement('div');
    privacySettingDetails.className = 'privacy-setting-details';
    privacySettingDiv.appendChild(privacySettingDetails);

    // Create privacy setting recommended value and add to details div
    const privacySettingRecommendation = document.createElement('div');
    privacySettingRecommendation.className = `privacy-setting-details-recommendation ${
      isRecommendedValueSelected ? 'ok' : 'warn'
    }`;
    privacySettingRecommendation.innerText = `We recommend ${
      args.recommended ? args.strings.trueText : args.strings.falseText
    }`;
    privacySettingDetails.appendChild(privacySettingRecommendation);

    // Create privacy setting details and add to details div
    const privacySettingDetailsBody = document.createElement('div');
    privacySettingDetailsBody.className = 'privacy-setting-details-body';
    privacySettingDetailsBody.innerText = args.details;
    privacySettingDetails.appendChild(privacySettingDetailsBody);

    // Create privacy setting Why Enable? header and add to details div
    const privacySettingEnableHeading = document.createElement('div');
    privacySettingEnableHeading.className = 'privacy-setting-reasons-heading font-light';
    privacySettingEnableHeading.innerText = args.strings.trueText === 'Allowed' ? 'Why Allow?' : 'Why Enable?';

    // Create privacy setting enable reasons and add to details div
    const privacySettingEnableReasons = document.createElement('div');
    privacySettingEnableReasons.className = 'privacy-setting-reasons';
    privacySettingEnableReasons.innerText = args.enableReasons;

    // Create privacy setting Why Disable? header and add to details div
    const privacySettingDisableHeading = document.createElement('div');
    privacySettingDisableHeading.className = 'privacy-setting-reasons-heading font-light';
    privacySettingDisableHeading.innerText = args.strings.falseText === 'Blocked' ? 'Why Block?' : 'Why Disable?';

    // Create privacy setting disnable reasons and add to details div
    const privacySettingDisableReasons = document.createElement('div');
    privacySettingDisableReasons.className = 'privacy-setting-reasons';
    privacySettingDisableReasons.innerText = args.disableReasons;

    privacySettingDetails.appendChild(privacySettingEnableHeading);
    privacySettingDetails.appendChild(privacySettingEnableReasons);
    privacySettingDetails.appendChild(privacySettingDisableHeading);
    privacySettingDetails.appendChild(privacySettingDisableReasons);

    // Add container to parent Dom element
    privacyDiv.appendChild(privacySettingDiv);
  });
};

/**
 * General entrypoint to this script, creates all registered privacy settings and header
 */
export const constructPrivacy = (): void => {
  createRecommendedSettingsButton(PRIVACY_SETTINGS);

  PRIVACY_SETTINGS.forEach((setting) => void createPrivacySettingDiv(setting));
};
