# UI Contract: Angela y el Reino Arcoiris de las Palabras

This contract describes user-facing screens, inputs, outputs and state changes. It is not a backend API contract because the MVP is static and local-first.

## Home

Purpose:

- Welcome Angela.
- Present the Lengualandia story.
- Offer primary action to start "10 minutos magicos".

Inputs:

- Start daily mission.
- Open map.
- Open parent panel.

Outputs:

- Current streak.
- Current unicorn state.
- Angela comic state: greeting.

State changes:

- None unless a mission is started.

## Map

Purpose:

- Show worlds, lock states and next recommended action.

Inputs:

- Select world.
- Select mission.

Outputs:

- World title, status, reward part and progress.
- Locked-world explanation when applicable.

State changes:

- None until a mission starts.

## Mission Player

Purpose:

- Run a sequence of activities and show feedback.

Inputs:

- Select answer.
- Type answer or text.
- Arrange/order items.
- Mark oral checklist items.
- Continue to next step.

Outputs:

- Prompt.
- Options or input area.
- Feedback.
- Score and reward result.
- Angela comic state according to context.

State changes:

- Activity attempt recorded.
- Skill mastery updated.
- Mission completed when completion criteria are met.
- Reward unlocked when mission result qualifies.

## Unicorn Progress

Purpose:

- Show the unicorn forming over time.

Inputs:

- Equip unlocked customization where available.

Outputs:

- Unlocked parts.
- Locked previews.
- Current reward explanation.

State changes:

- Equipped customization updated locally.

## Parent Panel

Purpose:

- Let Evaristo or Sonia review progress without entering child flow.

Inputs:

- Open summary.
- Export progress.
- Import progress.
- Reset progress after confirmation.

Outputs:

- Minutes studied.
- Completed missions.
- Accuracy by world.
- Frequent mistakes.
- Topics mastered.
- Topics to reinforce.
- Recommendation text.

State changes:

- Import updates local progress after confirmation.
- Reset clears progress only after explicit confirmation.

## Writing Activity

Purpose:

- Guide Angela through small written texts.

Inputs:

- Type draft.
- Mark checklist items.
- Save draft.
- Complete activity.

Outputs:

- Prompt.
- Writing hints.
- Checklist.
- Saved state.

State changes:

- WritingArtifact created or updated locally.

## Oral Activity

Purpose:

- Support reading aloud, explanation and presentation practice.

Inputs:

- Start optional recording when available.
- Stop recording.
- Mark checklist.
- Complete activity.

Outputs:

- Prompt.
- Checklist.
- Permission/fallback message if recording unavailable.

State changes:

- OralPracticeArtifact saved locally.

## Error and Empty States

- Missing content: show friendly unavailable message and return to map.
- Storage unavailable: warn that progress may not persist and recommend export.
- Missing Angela asset: show named placeholder.
- Import failure: reject invalid progress file and keep current state.
- GitHub Pages route refresh: return to the requested hash route or a safe home route without a 404/blank screen.
