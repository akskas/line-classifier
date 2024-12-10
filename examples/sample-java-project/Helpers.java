// Helper functions for additional tasks

public class Helpers {

    // Multiplies two numbers
    public static int multiply(int a, int b) {
        return a * b;
    }

    // Divides a by b, throwing an exception for division by zero
    public static double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return (double) a / b;
    }
}