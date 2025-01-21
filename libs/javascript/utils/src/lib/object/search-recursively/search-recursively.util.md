# searchRecursively

Searches recursively over a nested list of items.

It requires the itemType to have a property "children" of the same type

## How to use

````typescript
import { searchRecursively } from "@studiohyperdrive/utils";

interface Example {
    id: number;
    children: TestType[];
    otherProperties?: string;
}

const result = searchRecursively(
    [
        {
            id: 1,
            something: 'blub',
            children: [
                { id: 2, something: 'random', children: [] },
                { id: 3, something: 'blubber', children: [] },
                {
                    id: 4,
                    something: 'oops?',
                    children: [
                        { id: 5, something: 'hello blub', children: [] },
                        { id: 6, something: 'bye blub', children: [] },
                        {
                            id: 7,
                            something: 'hello',
                            children: [
                                { id: 8, something: 'something', children: [] },
                                { id: 9, something: 'hello and goodbye', children: [] },
                                { id: 10, something: 'yeah, no inspiration', children: [] },
                            ],
                        },
                    ],
                },
                { id: 11, something: 'another thing', children: [] },
            ],
            Searches recursively over a nested list of items.

                It requires the itemType to have a property "children" of the same type

## How to use

    ```typescript
import { searchRecursively } from "@studiohyperdrive/utils";

interface Example {
    id: number;
    children: TestType[];
    otherProperties?: string;
}

const data = [
    {
        id: 1,
        something: 'blub',
        children: [
            { id: 2, something: 'random', children: [] },
            { id: 3, something: 'blubber', children: [] },
            {
                id: 4,
                something: 'oops?',
                children: [
                    { id: 5, something: 'hello blub', children: [] },
                    { id: 6, something: 'bye blub', children: [] },
                    {
                        id: 7,
                        something: 'hello',
                        children: [
                            { id: 8, something: 'something', children: [] },
                            { id: 9, something: 'hello and goodbye', children: [] },
                            { id: 10, something: 'yeah, no inspiration', children: [] },
                        ],
                    },
                ],
            },
            { id: 11, something: 'another thing', children: [] },
        ],
    },
];

const result = searchRecursively(
    data,
    item => item.something.includes('hello')
);
// result = { id: 5, something: 'hello blub', children: [] };
````
