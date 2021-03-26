

#



# Lib


## Arrays

See enumerable


## DateTimes

### ensure(data: string) : Date
``` typescript
ensure('2021')
```



### format(data: string | Date, format: string, lan: langs = 'zh-cn') : string

```typescript
format(new Date(), 'd')
```

format:

year:
yyyy
yyy
yy
y

month:
MMMM
MMM
MM
M

day:
dddd
ddd
dd
d

hour:  12 
hh
h

hour: 24
HH
H

minute:
mm
m

second:
ss
s

am/pm:
tt
t

timezone:
zzz
zz
z

millisecond:
fff
ff
ff

millisecond:
FFF
FF
F

todo:
g
G


short:
d = yyyy/M/d
D = yyyy-MM-dd HH:mm:ss 

also see:
+ [Standard date and time format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings)
+ [Custom date and time format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)





# Reference

+ [jest](https://jestjs.io/zh-Hans)
+ [ts-jest]