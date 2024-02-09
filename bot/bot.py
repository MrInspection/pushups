import discord
from discord.ext import commands
intentis = discord.Intents(messages=True, guilds=True, members=True,message_content=True)

client = commands.Bot(command_prefix = '!', intents = intentis)

@client.event
async def on_ready():
    print("Bot Online")
@client.command()
async def hello(ctx):
    await ctx.send("Heya")
client.run('MTIwMzYzMDA4Nzc2OTk0ODE3MA.G2PWl0.MuVTxUP5bpH7aGIbh1J5GohWHKhkb0spqOXZh8')