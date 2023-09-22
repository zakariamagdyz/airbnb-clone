import CategoryStep from '../components/CategoryStep'
import LocationStep from '../components/LocationStep'

export enum ListingSteps {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

export const STEP_COMPONENTS = {
  [ListingSteps.CATEGORY]: {
    title: 'Which of these best describes your place?',
    subTitle: 'Pick a category',
    Component: CategoryStep,
  },
  [ListingSteps.LOCATION]: {
    title: 'Where is your place located?',
    subTitle: 'Help guests find you!',
    Component: LocationStep,
  },
  [ListingSteps.INFO]: {
    title: 'Share some basics about your place',
    subTitle: 'Let guests know the amenities you offer',
    Component: CategoryStep,
  },
  [ListingSteps.IMAGES]: {
    title: 'Add photos of your place',
    subTitle: 'Help guests visualize their stay',
    Component: CategoryStep,
  },
  [ListingSteps.DESCRIPTION]: {
    title: 'Describe your place',
    subTitle: 'Provide a brief and enticing description',
    Component: CategoryStep,
  },
  [ListingSteps.PRICE]: {
    title: 'Set your price',
    subTitle: 'How much will you charge per night?',
    Component: CategoryStep,
  },
}
