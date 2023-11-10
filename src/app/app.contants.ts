import { Menu } from "./shared/interfaces/menu.interface";

export class AppConstants {
    public static menuItems: Menu[] = [
        {
            id: 1,
            name: 'Home',
            link: ''
        },
        {
            id: 1,
            name: 'Products',
            link: '/products'
        }
    ];

    public static benefits: any[] = [
        {
            title: 'Explore Our Financial Products:',
            description: `Discover a wide range of financial products with just one click. Our application allows you to explore and learn
            in detail about each one, providing you with up-to-date information thanks to our direct connection to our
            database through an API.`
        },
        {
            title: 'Quick and Efficient Search:',
            description: `Looking for something specific? Use our search function to quickly find the products that suit your needs. The
            layout ensures a visually appealing and user-friendly experience.`
        },
        {
            title: 'Customize Your View:',
            description: `Take control of your experience by viewing the number of results you prefer. With our selector, choose between
            5, 10, or 20 records per page. Additionally, enjoy simple pagination to navigate easily through extensive
            results.`
        },
        {
            title: 'Create and Manage Your Products:',
            description: ` Ready to customize your portfolio? Use our intuitive form, to add new products to your
            account. With clear "Add product" and "Clear" buttons, the process is straightforward and efficient.`
        },
    ];

}
