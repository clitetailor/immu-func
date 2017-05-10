declare module "immu-func" {
	export function clone<T>(object: T): T;

	export function modify<T, U>(object: T, key: string | number, modifier: (arg: U) => U): T;
	export function update<T, U>(object: T, key: string | number, updater: (arg: U) => U): T;

	export function modifyFunc();
	export function updateFunc();
	
	export function setIn();
	export function setInFunc();

	export function modifyIn();
	export function updateIn();

	export function modifyInFunc();
	export function updateInFunc();

	export function keys();
	export function keyChain();

	export function assign();

	export function assignFunc();

	export function deepMerge();
	export function deepUpdate();

	export function deepMergeFunc();
	export function deepUpdateFunc();

	export function deepEqual();
	export function deepClone();

	export function setType();
	export function isIterable();

	export function isPrimitive();
	export function isObject();
}

declare module "immu-func/polyfill" {
	export interface Object {
		clone: () => any;
		assign: (source: any) => any;

		modify: (key: string | number, modifier: (arg: any) => any) => any;
		update: (key: string | number, updater: (arg: any) => any) => any;
		
		setIn: (keys: (string | number)[], value: any) => any;
		modifyIn: (keys: (string | number)[], modifier: (arg: any) => any) => any;
		updateIn: (keys: (string | number)[], updater: (arg: any) => any) => any;

		deepMerge: (source: any, merger: (target: any, source: any) => any) => any;
		deepUpdate: (source: any, updater: (target: any, source: any) => any) => any;

		deepEqual: (source: any, callback: (target: any, source: any) => boolean) => boolean;
		deepClone: (source: any) => any;

		setType: <T>(T) => T;
	}

	export interface Array {
		clone: () => any;
		assign: (source: any) => any;

		modify: (key: string | number, modifier: (arg: any) => any) => any;
		update: (key: string | number, updater: (arg: any) => any) => any;

		setIn: (keys: (string | number)[], value: any) => any;
		modifyIn: (keys: (string | number)[], modifier: (arg: any) => any) => any;
		updateIn: (keys: (string | number)[], updater: (arg: any) => any) => any;

		deepMerge: (source: any, merger: (target: any, source: any) => any) => any;
		deepUpdate: (source: any, updater: (target: any, source: any) => any) => any;

		deepEqual: (source: any, callback: (target: any, source: any) => boolean) => boolean;
		deepClone: (source: any) => any;

		setType: <T>(T) => T;
	}
}