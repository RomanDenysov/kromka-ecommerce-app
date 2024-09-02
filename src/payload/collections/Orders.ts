import { CollectionConfig, PayloadRequest } from "payload";
import { COLLECTION_SLUG } from "~/payload/config";
import { isAdmin, isAdminOrCreatedBy } from "~/payload/access";
import { Order } from "~/payload-types";

interface OrderProduct {
  product: string; // assuming product ID is a string
  quantity: number;
  price: number;
}

export const Orders: CollectionConfig = {
  slug: COLLECTION_SLUG.ORDERS,
  admin: {
    useAsTitle: "status",
    defaultColumns: ["name", "status", "createdBy"],
  },
  access: {
    read: isAdminOrCreatedBy,
    create: () => true,
    update: isAdmin,
    delete: () => false,
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }: { req: PayloadRequest, operation: string, data: Partial<Order> }) => {
        if (operation === 'create') {
          if (req.user) {
            data!.createdBy = req.user.id
          }
          return data
        }
      }
    ]
  },
  fields: [
    {
      name: "createdBy",
      type: "relationship",
      relationTo: COLLECTION_SLUG.USERS,
      label: "Customer",
      required: true,
      hasMany: false,
      access: {
        update: () => false,
      },
      admin: {
        position: "sidebar",
        readOnly: true,
        condition: (data) => Boolean(data?.createdBy),
      },
    },
    {
      name: "status",
      type: "select",
      label: "Order Status",
      required: true,
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'In progress',
          value: 'progress',
        },
        {
          label: 'Ready for pickup/delivery',
          value: 'ready',
        },
        {
          label: 'Shipped',
          value: 'shipped',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      admin: {
        position: 'sidebar',
        description: "Pending - the order hasn't been processed yet (default). In progress - the order is being processed. Ready for pickup/delivery - the order is ready for pickup/delivery. Shipped - the order has been shipped. Completed - the order has been completed. Cancelled - the order has been cancelled.",
      },
      defaultValue: 'pending',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Payment Method',
      required: true,
      options: [
        {
          label: 'Pickup in store (cash or card)',
          value: 'cash',
        },
        {
          label: 'Card',
          value: 'card',
        },
        {
          label: 'Stripe (optional now)',
          value: 'stripe',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      label: 'Payment Status',
      required: true,
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'In progress',
          value: 'progress',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      defaultValue: 'pending',
    },
    {
      name: '_isPaid',
      type: 'checkbox',
      required: true,
      access: {
        read: ({req}) => req?.user?.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: COLLECTION_SLUG.PRODUCTS,
          label: 'Product',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Quantity',
          required: true,
          min: 1,
        }
      ]
    },
    {
      name: 'subtotal',
      type: 'number',
      label: 'Subtotal',
      min: 0,
      max: 10000,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'discount',
      type: 'number',
      label: 'Discount',
      min: 0,
      max: 10,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Discount of the order',
      },
    },
    {
      name: 'totalPrice',
      type: 'number',
      label: 'Total Price',
      required: true,
      min: 0,
      max: 10000,
      admin: {
        position: 'sidebar',
        description: 'Total price of the order after discount',
        readOnly: true,
      },
    },
    {
      name: 'deliveryMethod',
      type: 'select',
      label: 'Delivery Method',
      required: true,
      options: [
        {
          label: 'Delivery',
          value: 'delivery',
        },
        {
          label: 'Pickup',
          value: 'pickup',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        position: 'sidebar',
        description: "Delivery - the order will be delivered to the customer's address. Pickup - the order will be picked up from the customer's address. Other - the order will be delivered to the customer's address and picked up from the customer's address.",
      },
      defaultValue: 'pickup',
    },
    {
      name: 'pickupStore',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.STORES,
      label: 'Pickup Store',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Pickup store of the order',
        condition: (data) => data.deliveryMethod === 'pickup',
      },
    },
    {
      name: 'deliveryAddress',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.ADDRESSES,
      label: 'Delivery Address',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Delivery address of the order',
        condition: (data) => data.deliveryMethod === 'delivery',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
      admin: {
        description:
          'Internal notes for the admins and store managers, sellers',
      },
    },
  ],
  timestamps: true,
}