import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Capybara {
  id: number;
  name: string;
  happiness: number;
  hunger: number;
  cleanliness: number;
  level: number;
  age: number;
  mood: "happy" | "hungry" | "dirty" | "sleepy" | "playful";
}

const Index = () => {
  const [coins, setCoins] = useState(150);
  const [capybaras, setCapybaras] = useState<Capybara[]>([
    {
      id: 1,
      name: "Барри",
      happiness: 85,
      hunger: 60,
      cleanliness: 75,
      level: 3,
      age: 12,
      mood: "happy",
    },
    {
      id: 2,
      name: "Луна",
      happiness: 70,
      hunger: 40,
      cleanliness: 90,
      level: 2,
      age: 8,
      mood: "hungry",
    },
    {
      id: 3,
      name: "Макс",
      happiness: 95,
      hunger: 80,
      cleanliness: 55,
      level: 4,
      age: 15,
      mood: "playful",
    },
  ]);

  const feedCapybara = (id: number) => {
    if (coins >= 10) {
      setCoins(coins - 10);
      setCapybaras(
        capybaras.map((cap) =>
          cap.id === id
            ? {
                ...cap,
                hunger: Math.min(100, cap.hunger + 25),
                happiness: Math.min(100, cap.happiness + 10),
              }
            : cap,
        ),
      );
    }
  };

  const cleanCapybara = (id: number) => {
    if (coins >= 15) {
      setCoins(coins - 15);
      setCapybaras(
        capybaras.map((cap) =>
          cap.id === id
            ? {
                ...cap,
                cleanliness: Math.min(100, cap.cleanliness + 30),
                happiness: Math.min(100, cap.happiness + 5),
              }
            : cap,
        ),
      );
    }
  };

  const playWithCapybara = (id: number) => {
    if (coins >= 5) {
      setCoins(coins - 5);
      setCapybaras(
        capybaras.map((cap) =>
          cap.id === id
            ? {
                ...cap,
                happiness: Math.min(100, cap.happiness + 20),
                hunger: Math.max(0, cap.hunger - 10),
              }
            : cap,
        ),
      );
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "hungry":
        return "🤤";
      case "dirty":
        return "🙈";
      case "sleepy":
        return "😴";
      case "playful":
        return "🎪";
      default:
        return "😊";
    }
  };

  const getStatusColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    if (value >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #87CEEB 0%, #228B22 100%)",
      }}
    >
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="text-3xl font-bold text-[#8B4513]"
                style={{ fontFamily: "Caveat, cursive" }}
              >
                🏡 Капибара Ферма
              </div>
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 border-yellow-300"
              >
                <Icon name="Coins" size={16} className="mr-1" />
                {coins} монет
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-[#228B22] hover:bg-[#1F5F1F] text-white">
                <Icon name="Plus" size={16} className="mr-1" />
                Купить капибару
              </Button>
              <Button
                variant="outline"
                className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
              >
                <Icon name="Settings" size={16} className="mr-1" />
                Магазин
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capybaras.map((capybara) => (
            <Card
              key={capybara.id}
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/95 backdrop-blur-sm border-2 border-[#8B4513]/20"
            >
              <CardHeader className="text-center pb-3">
                <div className="relative">
                  <img
                    src="/img/3f8845cf-9c91-4e31-9436-25febf2e27ef.jpg"
                    alt={capybara.name}
                    className="w-24 h-24 mx-auto rounded-full border-4 border-[#8B4513]/30 shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-md">
                    {getMoodEmoji(capybara.mood)}
                  </div>
                </div>
                <CardTitle
                  className="text-xl text-[#8B4513]"
                  style={{ fontFamily: "Caveat, cursive" }}
                >
                  {capybara.name}
                </CardTitle>
                <div className="flex justify-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#8B4513]/10 text-[#8B4513]"
                  >
                    Уровень {capybara.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-[#228B22] text-[#228B22]"
                  >
                    {capybara.age} дней
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Счастье</span>
                      <span className="text-sm font-medium">
                        {capybara.happiness}%
                      </span>
                    </div>
                    <Progress value={capybara.happiness} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Сытость</span>
                      <span className="text-sm font-medium">
                        {capybara.hunger}%
                      </span>
                    </div>
                    <Progress value={capybara.hunger} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Чистота</span>
                      <span className="text-sm font-medium">
                        {capybara.cleanliness}%
                      </span>
                    </div>
                    <Progress value={capybara.cleanliness} className="h-2" />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => feedCapybara(capybara.id)}
                    disabled={coins < 10}
                    size="sm"
                    className="bg-[#228B22] hover:bg-[#1F5F1F] text-white flex flex-col items-center py-3"
                  >
                    <Icon name="Apple" size={16} />
                    <span className="text-xs mt-1">Кормить</span>
                    <span className="text-xs opacity-70">10₼</span>
                  </Button>

                  <Button
                    onClick={() => cleanCapybara(capybara.id)}
                    disabled={coins < 15}
                    size="sm"
                    className="bg-[#87CEEB] hover:bg-[#5F9EA0] text-white flex flex-col items-center py-3"
                  >
                    <Icon name="Droplets" size={16} />
                    <span className="text-xs mt-1">Мыть</span>
                    <span className="text-xs opacity-70">15₼</span>
                  </Button>

                  <Button
                    onClick={() => playWithCapybara(capybara.id)}
                    disabled={coins < 5}
                    size="sm"
                    className="bg-[#8B4513] hover:bg-[#654321] text-white flex flex-col items-center py-3"
                  >
                    <Icon name="Gamepad2" size={16} />
                    <span className="text-xs mt-1">Играть</span>
                    <span className="text-xs opacity-70">5₼</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Farm Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-[#8B4513]/20">
            <CardContent className="p-4 text-center">
              <Icon
                name="Heart"
                size={24}
                className="mx-auto mb-2 text-red-500"
              />
              <div className="text-2xl font-bold text-[#8B4513]">
                {Math.round(
                  capybaras.reduce((sum, cap) => sum + cap.happiness, 0) /
                    capybaras.length,
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Среднее счастье</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-[#8B4513]/20">
            <CardContent className="p-4 text-center">
              <Icon
                name="Users"
                size={24}
                className="mx-auto mb-2 text-[#228B22]"
              />
              <div className="text-2xl font-bold text-[#8B4513]">
                {capybaras.length}
              </div>
              <div className="text-sm text-gray-600">Всего капибар</div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-[#8B4513]/20">
            <CardContent className="p-4 text-center">
              <Icon
                name="TrendingUp"
                size={24}
                className="mx-auto mb-2 text-[#87CEEB]"
              />
              <div className="text-2xl font-bold text-[#8B4513]">
                {Math.round(
                  capybaras.reduce((sum, cap) => sum + cap.level, 0) /
                    capybaras.length,
                )}
              </div>
              <div className="text-sm text-gray-600">Средний уровень</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
