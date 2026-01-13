import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { ArrowRight, Smartphone, Building, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/components/ProductCard";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter((product) => product.featured);

  const categories = [
    {
      name: "Coffee Machines",
      icon: Smartphone,
      description:
        "Professional coffee machines, espresso machines, and grinders",
      count: products.filter((p) => p.category === "Coffee Machines").length,
    },
    {
      name: "Spare Parts",
      icon: Cog,
      description: "Genuine spare parts for all types of business equipment",
      count: products.filter((p) => p.category === "Spare Parts").length,
    },
    {
      name: "Refrigeration",
      icon: Building,
      description: "Commercial refrigerators, freezers, and cooling equipment",
      count: products.filter((p) => p.category === "Refrigeration").length,
    },
    {
      name: "Food Processing",
      icon: Cog,
      description: "Meat slicers, mixers, and food preparation equipment",
      count: products.filter((p) => p.category === "Food Processing").length,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you need from our organized categories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.name}
                  className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <CardHeader className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium text-secondary">
                      several items available
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-picked equipment offering exceptional value
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="text-muted-foreground">
                  Loading featured products...
                </div>
              </div>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))
            )}
          </div>

          <div className="text-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Dawa Coffee Machine & Business Equipment?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your trusted partner for quality coffee machines in kenya - giving
            coffee machines a second life while saving you money
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                Quality
              </div>
              <p className="text-muted-foreground">
                Every item tested & verified
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                Savings
              </div>
              <p className="text-muted-foreground">
                Up to 70% off retail prices
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                Sustainability
              </div>
              <p className="text-muted-foreground">
                Giving coffee machines a second life
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Trust</div>
              <p className="text-muted-foreground">
                Trusted coffee machines by businesses
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
