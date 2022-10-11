# Implementation Notes

- Pinia as dev dependency instead of dependency
  - otherwise the package user will receive error `getActivePinia was called with no active Pinia` due to using Pinia multiple times ([reference](https://github.com/vuejs/pinia/discussions/1059))
