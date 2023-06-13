<?php

class ReservasApp
{
    protected $conn;

    public function __construct() {
        $this->sessionInit();
        $this->connectToDatabase();
      }
    

    private function sessionInit()
    {
        session_name("Reservas");
        session_start();
    }
    public function closeConnection() {
        $this->conn->close();
      }
    private function connectToDatabase()
    {
        $servername = "localhost";
        $username = "RECUJUNIO";
        $password = "RECUJUNIOPSWD";
        $dbname = "reservas";

        $this->conn = new mysqli($servername, $username, $password, $dbname);

        if ($this->conn->connect_error) {
            die("Error en la conexión a la base de datos: " . $this->conn->connect_error);
        }
    }

    public function run()
    {   
        ob_clean();
        $this->renderHeader();
        $this->renderRegistrationForm();
        $this->renderLoginForm();

        $usuario_logeado = false;
        $this->processRegistrationForm();
        $this->processLoginForm();
        $this->processReservationForm();

        $this->renderReservationForm();
        $this->renderFooter();

        $this->closeConnection();
    }

    private function processRegistrationForm()
    {
        if (isset($_POST['submit_registro'])) {
            $correo = $_POST['correoRegistro'];
            $contrasena = $_POST['contrasenaRegistro'];

            $usuario = new Usuario($this->conn, $correo, $contrasena);
            $usuario->registrarUsuario();
        }
    }

    private function processLoginForm()
    {
        if (isset($_POST['submit_login'])) {
            $correo = $_POST['correoInicio'];
            $contrasena = $_POST['contrasenaInicio'];

            $sql = "SELECT * FROM usuarios WHERE correo='$correo' AND Contraseña='$contrasena'";
            $result = $this->conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<h4>Bienvenido, $correo!</h4>";
                $_SESSION['correo'] = $correo;
                $_SESSION['usuario_logeado'] = true;
                $_SESSION['presupuesto'] = 0; // Inicializar el presupuesto en 0
            } else {
                echo "<h4>Inicio de sesión fallido. Verifica tus credenciales.</h4>";
            }
        }

    }

    private function processReservationForm()
    {
        if (isset($_POST['submit_reserva'])) {
            $dia = $_POST['dia'];
            $hora_entrada = $_POST['hora_entrada'];
            $hora_salida = $_POST['hora_salida'];
            $recurso = $_POST['recurso'];
            $numAdultos = $_POST['numAdultos'];
            $numMenores = $_POST['numMenores'];

            $fecha = new Fecha($this->conn, $dia, $hora_entrada, $hora_salida);
            $fecha->crearFecha($this->conn);
            $id_fecha = $fecha->obtenerIdFecha($this->conn);
            
            $reserva = new Reserva($this->conn,$id_fecha, $recurso, $numAdultos, $numMenores);
            if($reserva->realizarReserva()==true){

            // Obtener presupuesto actualizado de la sesión
            $reserva->actualizarPresupuesto($numAdultos,$numMenores);
             echo '<h4>Presupuesto actual: '.$_SESSION['presupuesto'].'</h4>';
            }
        }
    }
    

    private function renderHeader()
    {
        echo '
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="author" content="Guillermo Pérez" /> 
            <link rel="stylesheet" type="text/css" href="estilo/estiloReservas.css" >
            <link rel="stylesheet" type="text/css" href="estilo/layoutReservas.css" >
            <title>Nava</title>
        </head>
        <body>
            <header>
                <h1>Nava, Asturias</h1>
                <nav>
                    <ul>
                        <li><a href="index.html">Página principal</a></li>
                        <li><a href="gastronomia.html">Gastronomía</a></li>
                        <li><a href="rutas.html">Rutas</a></li>
                        <li><a href="meteorologia.html">Meteorología</a></li>
                        <li><a href="juego.html">Juego</a></li>
                        <li><a href="reservas.html">Reservas</a></li>
                    </ul>
                </nav>
            </header>
            
        ';
    }

    private function renderRegistrationForm()
    {
        echo '
            <h2>Registro</h2>
            <form method="POST" action="' . $_SERVER['PHP_SELF'] . '">
                <input type="email" name="correoRegistro" placeholder="Correo" required><br>
                <input type="password" name="contrasenaRegistro" placeholder="Contraseña" required><br>
                <input type="submit" name="submit_registro" value="Registrarse">
            </form>
        ';
    }

    private function renderLoginForm()
    {
        echo '
            <h2>Iniciar Sesión</h2>
            <form method="POST" action="' . $_SERVER['PHP_SELF'] . '">
                <input type="email" name="correoInicio" placeholder="Correo" required><br>
                <input type="password" name="contrasenaInicio" placeholder="Contraseña" required><br>
                <input type="submit" name="submit_login" value="Iniciar Sesión">
            </form>
            
        ';
    }

    private function renderReservationForm()
    {
        if (isset($_SESSION['usuario_logeado']) && $_SESSION['usuario_logeado']) { 
            $correo=$_SESSION['correo'];
            echo '
                <h2>Realizar Reserva</h2>
                <form method="post" action="#">
                    <input type="hidden" id="usuario" value="' . $correo . '">
                    <label for="dia">Día:</label>
                    <input type="date" id="dia" required>
                    <label for="hora_entrada">Hora de entrada:</label>
                    <input type="time" id="hora_entrada" required>
                    <label for="hora_salida">Hora de salida:</label>
                    <input type="time" id="hora_salida" required>
                    <label for="recurso">Recurso:</label>
                    <select id="recurso" required>
                    <option value=""disabled selected>Seleccionar opción</option>
            ';
    
            $sql = "SELECT * FROM recursos";
            $result = $this->conn->query($sql);
    
            if ($result->num_rows > 0) {
                $contenidoDescripcion='<h3>Descripción de los recursos:</h3>';
                while ($row = $result->fetch_assoc()) {
                    $nombreRecurso = $row['Nombre'];
                    $precioId = $row['ID_precio'];
                    $contenidoDescripcion .= '<h4>' . $nombreRecurso . '</h4>';
                    $contenidoDescripcion .= '<p>' . $row['Descripcion'] . '</p>';
    
                    // Obtener el precio para menores y adultos del recurso
                    $sqlPrecio = "SELECT Precio_menores, Precio_adultos FROM precios WHERE ID='$precioId'";
                    $resultPrecio = $this->conn->query($sqlPrecio);
    
                    if ($resultPrecio->num_rows > 0) {
                        $rowPrecio = $resultPrecio->fetch_assoc();
                        $precioMenores = $rowPrecio['Precio_menores'];
                        $precioAdultos = $rowPrecio['Precio_adultos'];

    
                        $contenidoDescripcion .= '<p>Precio para menores: ' . $precioMenores . '€ </p>';
                        $contenidoDescripcion .= '<p>Precio para adultos: ' . $precioAdultos . '€ </p>';
                        $_SESSION['precio_menores'] = $precioMenores;
                        $_SESSION['precio_adultos'] = $precioAdultos;
                    }
    
                    echo "<option value='$nombreRecurso'>$nombreRecurso</option>";
                }
            }
    
            echo '
                    </select>
                    <label for="numAdultos">Número de Adultos:</label>
                    <input type="number" id="numAdultos" min="1" required>
                    <label for="numMenores">Número de Menores:</label>
                    <input type="number" id="numMenores" min="0" required>
                    <input type="submit" name="submit_reserva" value="Reservar">
                </form>
                <section>' . $contenidoDescripcion . '</section>
            ';
        }
    }
    

    public function renderFooter()
    {
        echo '
            <footer>
                <p>Web concejo de Nava</p>
                <p>Guillermo Pérez Alonso</p>
                <p>Software y Estándares para la Web - Curso 2022/2023</p>
            </footer>
        </body>
        </html>
        ';
    }
}

class Usuario
{
    private $correo;
    private $contrasena;

    public function __construct($correo, $contrasena)
    {
        $this->correo = $correo;
        $this->contrasena = $contrasena;
    }

    public function registrarUsuario()
    {
        global $conn;
        $sql = "INSERT INTO usuarios (correo, Contraseña) VALUES ('$this->correo', '$this->contrasena')";

        if ($conn->query($sql) === TRUE) {
            echo "<h4>Registro exitoso. Ahora puedes iniciar sesión.</h4>";
        } else {
            echo "Error al registrar el usuario: Ya se encuentra registrado";
        }
    }
}

class Reserva
{
    private $conn;
    private $usuario;
    private $fecha;
    private $recurso;
    private $numAdultos;
    private $numMenores;

    public function __construct( $conn,$fecha, $recurso, $numAdultos, $numMenores)
    {
        $this->conn = $conn;
        $this->fecha = $fecha;
        $this->recurso = $recurso;
        $this->numAdultos = $numAdultos;
        $this->numMenores = $numMenores;
    }

    public function realizarReserva()
    {
        $aforo = $this->getAforo($this->recurso);
        $ocupacion = $this->getOcupacion($this->recurso);
        $totalPersonas = $this->numMenores + $this->numAdultos;
        if (($ocupacion + $totalPersonas) <= $aforo) {
        $sql = "INSERT INTO reservaciones (ID_Usuario, ID_Fecha, ID_Recurso, Numero_adultos, Numero_menores) 
                VALUES ('$_SESSION[correo]', '$this->fecha', '$this->recurso', $this->numAdultos, $this->numMenores)";
        
        $this->actualizarOcupacion($this->recurso, $totalPersonas);

        if ($this->conn->query($sql) === TRUE) {
            echo "<h2>Reserva realizada exitosamente.</h2>";
            return true;
        } else {
            echo "Error al realizar la reserva: " . $this->conn->error;
            return false;
        }
    }

    }

    public function actualizarPresupuesto($cantidad_adultos,$cantidad_menores)
    {
    
        $costo_adultos = $cantidad_adultos * $_SESSION['precio_adultos'];
        $costo_menores = $cantidad_menores * $_SESSION['precio_menores'];
        $_SESSION['presupuesto'] += $costo_adultos + $costo_menores;
    }
    
    public function getAforo($id_recurso)
    {
       $sql = "SELECT aforo FROM recursos WHERE nombre = '$id_recurso'";
       $result = $this->conn->query($sql);
    
       if ($result && $result->num_rows > 0) {
           $row = $result->fetch_assoc();
           return $row['aforo'];
       } else {
           // Manejar el caso en el que no se encuentre el recurso o la consulta no se ejecute correctamente
           return 0; // O cualquier otro valor predeterminado que desees asignar
       }
    }
    
    public function getOcupacion($id_recurso)
{
   $sql = "SELECT ocupacion FROM recursos WHERE nombre = '$id_recurso'";
   $result = $this->conn->query($sql);

   if ($result && $result->num_rows > 0) {
       $row = $result->fetch_assoc();
       return $row['ocupacion'];
   } else {
       // Manejar el caso en el que no se encuentre el recurso o la consulta no se ejecute correctamente
       return 0; // O cualquier otro valor predeterminado que desees asignar
   }
}


    public function actualizarOcupacion($id_recurso, $totalPersonas)
    {
        
        $sql = "UPDATE recursos SET ocupacion = ocupacion + $totalPersonas WHERE nombre = '$id_recurso'";
        $this->conn->query($sql);
    }


    
    


}

class Fecha
{
    private $conn;
    private $dia;
    private $hora_entrada;
    private $hora_salida;

    public function __construct($conn, $dia, $hora_entrada, $hora_salida)
    {
        $this->conn = $conn;
        $this->dia = $dia;
        $this->hora_entrada = $hora_entrada;
        $this->hora_salida = $hora_salida;
    }

    public function crearFecha()
    {
        $sql = "INSERT INTO fechas (ID, dia, hora_entrada, hora_salida) VALUES (null, '$this->dia', '$this->hora_entrada', '$this->hora_salida')";

        if ($this->conn->query($sql) === false) {
            echo "<h2>No se ha podido añadir la fecha.</h2>";
        }
    }

    public function obtenerIdFecha()
    {
        $sql = "SELECT id FROM fechas WHERE dia='$this->dia' AND hora_entrada='$this->hora_entrada' AND hora_salida='$this->hora_salida'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['id'];
        } else {
            return null;
        }
    }
}




$reservasApp = new ReservasApp();
$reservasApp->run();
?>
