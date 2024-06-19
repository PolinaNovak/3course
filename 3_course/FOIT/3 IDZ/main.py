import matplotlib.pyplot as plot
import numpy as np

N = 8192
dt = 0.0196349540849362
L1 = 12.6488778185597
L2 = 0.451427837343368
C1 = 1.15154953201999E-05
C2 = 1.07110850608727E-05
R1 = 116.145703538366
R2 = 30.975023601527
R3 = 1076.85895580541
R4 = 539.745493386786
df= 1 / (dt * N)

def file():
    with open('C:\\Users\\polia\\PycharmProjects\\pythonProject1\\23.txt', 'r') as file:
        signal = []
        for line in file:
            signal.append(float(line))
        file.close()
        return signal

def drawSignal(signal):
    time = [dt * i for i in range(N)]
    plot.title('Сигнал')
    plot.xlabel('t')
    plot.ylabel('s')
    plot.plot(time, signal)
    plot.show()

def drawAmp(sequence,is_stop):
    plot.title('Амплитуда входа')
    plot.xlabel('ω')
    plot.ylabel('A')
    plot.plot(sequence[:is_stop], spectreAbs[:is_stop])
    plot.show()

def calculateH(w):
    j=complex(0, 1)
    Z_C1        = 1 / (j * w * C1)
    Z_C2        = 1 / (j * w * C2)
    Z_L1        = j * w * L1
    Z_L2        = j * w * L2
    R_input     = R1 + Z_L1 + (R4 + Z_C2) * (R2 + R3 + Z_C1 + Z_L2) / (R2 + R3 + R4 + Z_C1 + Z_C2 + Z_L2)
    R_output    = (R4 + Z_C2) * R2 / (R2 + R3 + R4 + Z_C1 + Z_C2 + Z_L2)
    return R_output / R_input

def drawAfr(is_stop, sequence):
    plot.title('H')
    plot.xlabel('ω, рад/c')
    plot.ylabel('H')
    plot.plot(sequence[1:is_stop], H[:is_stop-1])
    plot.show()


signal= file()
drawSignal(signal)

spectre=np.fft.fft(signal)
spectreAbs =[abs(each) for each in spectre]
sequence=[2 * np.pi * df * i for i in range(N)]
isStop=round(50 / (np.pi * df)) + 1
H=[abs(calculateH(w)) for w in sequence[1:]]
result=calculateH(35)

drawAmp(sequence, isStop)
drawAfr(isStop, sequence)

print(abs(result))

