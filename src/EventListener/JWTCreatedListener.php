<?php

namespace App\EventListener;

use App\Service\Serializer\SerializerService;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTCreatedListener
{
    /**
     * @var RequestStack
     */
    private $requestStack;
    private $serializer;
    
    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack, SerializerService $serializer)
    {
        $this->requestStack = $requestStack;
        $this->serializer = $serializer;
    }
    
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();
        $data['data'] = [
            'id' => $user->getId(),
            'email' =>$user->getEmail(),
            'roles' => $user->getRoles(),
        ];
        $payload = $data;
        $event->setData($payload);
    }
}
