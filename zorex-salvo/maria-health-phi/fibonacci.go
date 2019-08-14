package main
import "fmt"

func main() {
	count := 10
	prev := 0
	next := 1
	current := 0

	for i := 0; i < count; i++ {
		if (prev % 3 == 0) {
			fmt.Println("Maria")
		} else if (prev % 5 == 0) {
			fmt.Println("Health")
		} else if (prev % 3 == 0 && prev % 5 == 0) {
			fmt.Println("Maria Health")
		} else {
			fmt.Println(prev)
		}
		
		current = prev + next
		prev = next
		next = current
		
	}

}
