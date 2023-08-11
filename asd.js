import prompts from 'prompts';

await prompts ({
  type: 'multiselect',
  message: 'What?',
  choices: [
    { title: 'Italy', value: 'it' },
    { title: 'Turkey', value: 'tr', disabled: true },
    { title: 'United Kingdom', value: 'uk' }
  ]
})
