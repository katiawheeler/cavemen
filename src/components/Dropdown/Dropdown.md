# Dropdown

| Prop               | Description                                              | Type                           | Required                       | Default Value |
|--------------------|----------------------------------------------------------|--------------------------------|:------------------------------:|:-------------:|
| **options**        | An array of `Option` type to display                     | `Option[]`                     | *                              |       -       |
| **onChange**       | An event handler for when an `Option` is selected.       | `Handler`                      | *                              |       -       |
| **default**        | A default `Option` to be selected                        | `Option`                       |                                |       -       |
| **disabled**       | Whether or not the Dropdown is disabled                  | `Boolean`                      |                                |    `false`    |
| **id**             | An ID to append to the Dropdown wrapper                  | `String`                       |                                |       -       |
| **label**          | A label for the Dropdown - appears directly above it     | `String`                       |                                |       -       |
| **multiple**       | Whether or not the Dropdown should be a mult-select      | `Boolean`                      |                                |    `false`    |
| **open**           | Whether or not the Dropdown is open on render            | `Boolean`                      |                                |    `false`    |
| **placeholder**    | Placeholder text before a user selects an option         | `String`                       |                                |       -       |

***

***

# Types

## Option

```ts
interface Option {
    key: string,
    value: string | number,
    name: string
}
```

## Handler

```ts
type Handler = (option: Option | Option[] | null, event: SyntheticEvent) => void;
```

