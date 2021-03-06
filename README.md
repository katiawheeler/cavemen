# Cavemen
Primitive React Components

**PLEASE NOTE:** At this current time, `searchable` cannot be used with `multiple`

# Dropdown

| Prop               | Description                                              | Type                           | Required                       | Default Value |
|--------------------|----------------------------------------------------------|--------------------------------|:------------------------------:|:-------------:|
| **options**        | An array of `Option` type to display                     | `Option[]`                     | *                              |       -       |
| **onChange**       | An event handler for when an `Option` is selected.       | `Handler`                      | *                              |       -       |
| **clearable**      | Whether or not the Dropdown Option can be cleared        | `Boolean`                      |                                |    `false`    |
| **default**        | A default `Option` to be selected                        | `Option`                       |                                |       -       |
| **disabled**       | Whether or not the Dropdown is disabled                  | `Boolean`                      |                                |    `false`    |
| **id**             | An ID to append to the Dropdown wrapper                  | `String`                       |                                |       -       |
| **label**          | A label for the Dropdown - appears directly above it     | `String`                       |                                |       -       |
| **multiple**       | Whether or not the Dropdown should be a mult-select      | `Boolean`                      |                                |    `false`    |
| **open**           | Whether or not the Dropdown is open on render            | `Boolean`                      |                                |    `false`    |
| **placeholder**    | Placeholder text before a user selects an option         | `String`                       |                                |       -       |
| **searchable**     | Allows users to search for `Option`                      | `Boolean`                      |                                |    `false`    |
| **trigger**        | A component passed down as a trigger - for example, if you want an icon to have dropdown functionality         | `ReactNode`                       |                                |       -       |

## Dropdown Types

### Option

```ts
interface Option {
    value: string | number,
    name: string
}
```

### Handler

```ts
type Handler = (option: Option | Option[] | null, event: SyntheticEvent) => void;
```
