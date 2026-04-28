---
title: JavaScript Key Access - in vs hasOwn vs hasOwnProperty
date: 2025-07-26
tags: [javascript, typescript]
---

## TLDR

- `Object.hasOwn()` is the modern, safe choice
- `in` when you need inherited properties
- `hasOwnProperty()` is outdated - avoid it

## 3 Methods to check for properties

### `in` operator

```js
const obj = { name: 'Alice' }
console.log('name' in obj) // true
console.log('toString' in obj) // true (inherited from prototype)
```

### `Object.hasOwn()` (ES2022)

```js
const obj = { name: 'Alice' }
console.log(Object.hasOwn(obj, 'name')) // true
console.log(Object.hasOwn(obj, 'toString')) // false (not own property)
```

### `Object.prototype.hasOwnProperty()`

```js
const obj = { name: 'Alice' }
console.log(obj.hasOwnProperty('name')) // true
console.log(obj.hasOwnProperty('toString')) // false
```

## Key Differences

**Scope of check:**

- `in`: Checks own + inherited properties
- `hasOwn` + `hasOwnProperty`: Only own properties

**Safety:**

```js
// hasOwnProperty can be overridden
const dangerous = {
	hasOwnProperty: () => false,
}
console.log(dangerous.hasOwnProperty('hasOwnProperty')) // false (wrong!)

// hasOwn is always safe
console.log(Object.hasOwn(dangerous, 'hasOwnProperty')) // true (correct)

// Objects without prototype break hasOwnProperty
const nullObj = Object.create(null)
nullObj.name = 'Bob'
// nullObj.hasOwnProperty('name'); // TypeError!
console.log(Object.hasOwn(nullObj, 'name')) // true (works fine)
```

## When to Use What

**Use `in`** when you need to check prototype chain:

```js
const arr = [1, 2, 3]
console.log('push' in arr) // true - we can use arr.push()
```

**Use `Object.hasOwn()`** for most property checks:

```js
const config = { debug: true }
if (Object.hasOwn(config, 'debug')) {
	// Safe and clear
}
```

**Avoid `hasOwnProperty()`** - it's legacy and unsafe. Use `Object.hasOwn()` instead.

## TypeScript Considerations

### `in` vs. `Object.hasOwn` for Type Narrowing

When working with union types in TypeScript, you often need to figure out which specific type you're dealing with inside a function. This process is called **type narrowing**. The `in` operator is a fantastic tool for this, but what about its modern counterpart, `Object.hasOwn`? Let's see how they compare.

### The `in` Operator: A Natural Type Guard

The `in` operator checks if a property exists on an object or its prototype chain. TypeScript is smart enough to use this check to narrow down a union type.

Consider a `Pet` type. We can use `in` to determine if we have a `Cat` or a `Dog`.

```ts
interface Cat {
	meow: () => string
}

interface Dog {
	bark: () => string
}

type Pet = Cat | Dog

const handlePet = (pet: Pet): string => {
	// If 'meow' is in pet, TypeScript now knows `pet` is a `Cat`.
	if ('meow' in pet) {
		return pet.meow() // <-- safe ✅
	}
	// Otherwise, it must be a Dog.
	return pet.bark()
}
```

Inside the `if` block, the type of `pet` is narrowed from `Pet` to `Cat`, allowing you to safely access `pet.meow()`.

### `Object.hasOwn`: The Problem

`Object.hasOwn()` is often preferred over `in` because it _only_ checks an object's own properties, ignoring the prototype chain. However, it **does not** act as a type guard out-of-the-box.

If we swap `in` for `Object.hasOwn`, TypeScript gets confused.

```ts
const handlePetWithHasOwn = (pet: Pet): string => {
	if (Object.hasOwn(pet, 'meow')) {
		// ❌ Error: Property 'meow' does not exist on type 'Pet'.
		// return pet.meow()
	}
	return pet.bark() // ❌ Error: Property 'bark' does not exist on type 'Pet'.
}
```

The compiler doesn't narrow the type because the signature of `Object.hasOwn` doesn't give it the special hints it needs. This limitation was discussed in [TypeScript issue #44253](https://github.com/microsoft/TypeScript/issues/44253) when `Object.hasOwn()` reached stage 3 in the ECMAScript proposal process.

### The Solution: A Custom Type Guard

To get the best of both worlds; the safety of `Object.hasOwn` and the power of type narrowing, we can write our own **custom type guard**.

A type guard is a function that returns a boolean `true` or `false`, but it also includes a special return a **type predicate** (`obj is Type`) that tells TypeScript how to narrow the type.

```ts
/**
 * A custom type guard that uses Object.hasOwn to check for a property
 * and tells TypeScript that the property exists on the object.
 */
function hasOwn<T extends object, K extends PropertyKey>(
	obj: T,
	key: K,
): obj is T & Record<K, unknown> {
	return Object.hasOwn(obj, key)
}

const handlePetWithGuard = (pet: Pet): string => {
	// Now, we use our custom type guard.
	if (hasOwn(pet, 'meow')) {
		// ✅ Success! TypeScript narrows `pet` to `Cat`.
		return pet.meow()
	}
	// And narrows to `Dog` here.
	return pet.bark()
}
```

By creating the `hasOwn` helper, we explicitly tell the compiler what to do. When our function returns `true`, TypeScript understands that the object `pet` is now of a type that includes the `'meow'` property, successfully narrowing it to `Cat` from the `Pet` union.

## Browser Support

`Object.hasOwn()` is **ES2022** - relatively new:

- ✅ Chrome 93+, Firefox 92+, Safari 15.4+
- ❌ Internet Explorer (never)
- ❌ Node.js < 16.9.0

**Polyfill for older environments:**

```js
if (!Object.hasOwn) {
	Object.hasOwn = function (obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}
}
```

## References

- [MDN: `in` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
- [MDN: `Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- [MDN: `Object.prototype.hasOwnProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
