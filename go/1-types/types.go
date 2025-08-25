// number type in go

// integers
// uint8, uint16, uint32, uint64, int8, int16, int32, and int64.

// In addition, there two alias types: byte (which is the same as
// uint8) and rune (which is the same as int32).

// Floating-Point Numbers

// Go has two floating-point types: float32 and float64 (also often referred to as single
// precision and double precision, respectively).

// It also has two additional types for rep‐
// resenting complex numbers (numbers with imaginary parts): complex64 and
// complex128.

// strings

// String literals can be created using double quotes "Hello, World" or backticks
// `Hello, World`. The difference between these is that double-quoted strings cannot
// contain newlines and they allow special escape sequences. For example, \n gets
// replaced with a newline and \t gets replaced with a tab character.

// The following are some common operations on strings:
// len("Hello, World")
// Finds the length of a string
// "Hello, World"[1]
// Accesses a particular character in the string (in this case, the second character)
// "Hello, " + World"
// Concatenates two strings together

package main

import "fmt"

func main() {
	fmt.Println("1 + 1 = ", 1 + 1) // 1 + 1 =  2
	fmt.Println(len("Hello, World")) // 12
	fmt.Println("Hello, World"[1]) // 101
	fmt.Println("Hello, " + "World") // Hello, World
}