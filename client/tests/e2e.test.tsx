import { test, expect } from "@playwright/test";

test("has Add Book button", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const addBookButton = page.getByRole('button', { name: 'Add Book' });
    await expect(addBookButton).toBeVisible();
});


test("can add a book", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const addBookButton = page.getByRole('button', { name: 'Add Book' });
    await page.getByPlaceholder('Book Title').fill('The Great Gatsby');
    await addBookButton.click();
    await expect(page.getByText('The Great Gatsby')).toBeVisible();
});
