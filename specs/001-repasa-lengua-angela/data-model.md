# Data Model: Angela y el Reino Arcoiris de las Palabras

## LearnerProfile

Represents Angela's local learning profile.

Fields:

- `id`: stable local identifier
- `displayName`: shown learner name
- `createdAt`: first app use
- `lastSessionAt`: last activity date
- `totalMinutes`: accumulated study minutes
- `weeklyStreak`: current weekly rhythm
- `currentWorldId`: recommended world
- `completedMissionIds`: completed missions
- `currency`: stars, gems, magic books and help wands
- `rewardInventoryId`: linked reward state

Validation:

- Display name defaults to "Angela".
- Total minutes cannot be negative.
- Completed mission IDs must reference known missions.

## World

Represents a Lengualandia content area.

Fields:

- `id`
- `title`
- `theme`
- `description`
- `priority`
- `unlockRule`
- `rewardPart`
- `missionIds`
- `recommendedGradeFocus`

Validation:

- Every world has at least one mission before it is shown as playable.
- MVP worlds must include Puente 3 a 4, Ortografia, Gramatica and Comprension Lectora.

## Mission

Represents a playable learning sequence.

Fields:

- `id`
- `worldId`
- `title`
- `storyIntro`
- `goal`
- `estimatedMinutes`
- `activityIds`
- `minigameType`
- `reward`
- `completionCriteria`

Validation:

- MVP daily missions should fit within 10-12 minutes.
- A mission must include at least one activity and one reward.

## Activity

Represents one educational challenge.

Fields:

- `id`
- `worldId`
- `skillId`
- `type`
- `prompt`
- `options`
- `correctAnswer`
- `explanation`
- `difficulty`
- `textContentId`
- `tags`

Validation:

- Closed-answer activities require `correctAnswer`.
- Incorrect-answer feedback must include a constructive explanation.
- Activity type must be one of: multiple-choice, classify, order, fill-gap, detect-error, writing-prompt, oral-prompt, minigame.

## TextContent

Represents reading and literature material.

Fields:

- `id`
- `type`
- `title`
- `body`
- `sourceNote`
- `estimatedReadingLevel`
- `questionIds`

Validation:

- MVP must include at least 6 texts.
- Texts must be age-appropriate and short enough for daily missions.

## SkillMastery

Represents progress by skill.

Fields:

- `skillId`
- `attempts`
- `correct`
- `recentMistakes`
- `level`
- `lastPracticedAt`

Validation:

- Correct count cannot exceed attempts.
- Level derives from attempts, accuracy and recency.

## RewardInventory

Represents the unicorn and game rewards.

Fields:

- `unlockedParts`
- `maneColors`
- `accessories`
- `specialEffects`
- `motivationalMessages`
- `currencies`

Validation:

- A reward can only be unlocked once.
- Legendary unicorn state requires final evaluation completion.

## WritingArtifact

Represents a locally stored writing task.

Fields:

- `id`
- `promptId`
- `title`
- `draft`
- `checklist`
- `createdAt`
- `updatedAt`
- `missionId`

Validation:

- Draft may be empty while in progress.
- Checklist values are learner/parent-facing, not grading claims.

## OralPracticeArtifact

Represents a locally stored oral activity result.

Fields:

- `id`
- `promptId`
- `checklist`
- `recordingMetadata`
- `completedAt`

Validation:

- Recording metadata is optional.
- Checklist fallback is required when recording is unavailable.

## ParentSummary

Represents aggregated progress for adults.

Fields:

- `minutesThisWeek`
- `completedMissions`
- `accuracyByWorld`
- `frequentMistakes`
- `masteredTopics`
- `topicsToReinforce`
- `recommendations`
- `lastUpdatedAt`

Validation:

- Recommendations must be understandable without teacher vocabulary.
- If insufficient data exists, show "Necesita mas misiones para recomendar".

## State Transitions

Mission:

```text
locked -> available -> in_progress -> completed
```

World:

```text
locked -> available -> mastered
```

Reward:

```text
hidden -> preview -> unlocked -> equipped
```

WritingArtifact:

```text
draft -> completed -> reviewed
```
